require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../models')
const Login=db.login_master
const User  = db.user_master
const template = require('../views/template')
const nodeMailer = require('../utils/nodeMailer')

const { createError, throwErrorCode } = require('../error/error')

const { loginValidation } = require('../middleware/validation')
const { forgotPasswordValidation } = require('../middleware/validation')
const { resetPasswordValidation } = require('../middleware/validation')
const { actionLog } = require('../controllers/ActionLogController')
const { userSession } = require('../controllers/UserSessionController')
const logger = require('../logger')

const access = process.env.ACCESS_TOKEN_SECRET
const refresh = process.env.REFRESH_TOKEN_SECRET

const secretKey = process.env.MAIL_TOKEN_SECRET 
const clientUrl = process.env.CLIENT_URL


const { Op } = require('sequelize');

//for login
exports.login = async (req, res, next) => {

    const { error } = loginValidation(req.body)                                  //validating request
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message))
    const login = await Login.findOne({ where: { 
        
        [Op.or]: [{email: req.body.email}, {accountId: req.body.email}]

         }});    

    if (login){
        if(login.status === 99)                                                      //check whether the user is deleted or not
            res.status(500).json(throwErrorCode("1907 | An unexpected error occurred (deleted user)"))
    const user=await User.findOne({ where:{ id:login.userId}})    
        const isEqual =await bcrypt.compare(req.body.password, login.password)
        if(isEqual){
            let count=login.loginCount+1                                                //increment login count+1 store in variable c
            let datetime = new Date();                                              //get current time 
            await Login.update({ loginCount: count,lastLogin:datetime }, {                                  //updating login count and last loggin time
                where: {
                   id: login.id
                }
              });
            const data={ loginId: login.id, email: login.email, role: login.role,companyId:user.companyId,userId:login.userId}
            const accessToken= jwt.sign({...data},access,{expiresIn:'12h'})
            const refreshToken= jwt.sign({...data},refresh,{expiresIn:'7d'})
          
            actionLog(login.userId, `Login`, `Login`)
            userSession(login.userId,accessToken)  

            res.status(200).json({
                loginId:login.id,
                loginCount:login.loginCount,
                lastLogin:login.lastLogin,
                email:login.email,
                role:login.role,
                status:login.status,
                accessToken:accessToken,
                refreshToken:refreshToken
            })
        }
        else
            res.status(404).json(throwErrorCode("2003 | Password doesn't match"))
    } else
        return res.status(404).json(throwErrorCode("1035 | Email id or account id not found"))
}


//for forgot password
exports.forgotPassword = async (req,res)=>{

    const { error } = forgotPasswordValidation(req.body)                                  //validating request
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message));                                            //used in email sending
    const login = await Login.findOne({ where: { email: req.body.email } });         
    if(login === null)
        res.status(404).json(throwErrorCode("2002 | Email id does not exist"))
    else{
        const data = { id:login.id,accountId:login.accountId,userId: login.userId, message: `Please use the link below` }
        const token = await jwt.sign( {data}, secretKey, {expiresIn: '1h'})
        const url = `${clientUrl}/resetpassword?token=${token}`
        const mailBody = template.forgot(url)
        const subject = `Forgot Password`
        nodeMailer.sendMail(mailBody, req.body.email, subject)
        actionLog(login.userId, `Forgot Password`, `Forgot Password`)
        return res.status(200).json({email : req.body.email})
    }
 
}

//for reset password
exports.resetPassword = async (req,res) => {

     // Validate request body
    const { error } = resetPasswordValidation(req.body);
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message));

    const token = req.headers['token'];
    if(token == null) return res.status(500).json(throwErrorCode("1907 | An unexpected error occurred (token not passed / authentication failed)"))

    let verifyToken

    try {
        verifyToken = jwt.verify(token, secretKey)
    } catch (err) {
        return res.status(500).json(throwErrorCode("1907 | An unexpected error occurred (token not passed / authentication failed)"))
    }

    if(req.body.accountId !== verifyToken.data.accountId) res.status(404).json(throwErrorCode("2004 | Account id not found"))

    if(req.body.newPassword !== req.body.confirmPassword) res.status(404).json(throwErrorCode("2005 | New password doesn't match"))

    const encryptedPassword = await bcrypt.hash(req.body.newPassword,10)
    const datetime = new Date();

    await Login.update({ password: encryptedPassword, passwordChange: datetime}, {                                  //updating password
        where: {
           id: verifyToken.data.id
        }
    });

    actionLog(verifyToken.data.userId, `Reset Password`, `Reset Password`)
    return res.status(200).send("Password Reset Successful")
    }

// verify token is valid or not - interceptor
exports.verifyToken = async (req, res, next) => {
    if(!req.body.accessToken) return res.status(400).send("No Token")
    const token = req.body.accessToken
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return next(createError(401, "Token is invalid"))
        logger.info("Access token verified", {module: `Login Controller verifyToken`})
        return res.status(200).json(user)
    })
}

// generate access token using refresh token
exports.refreshToken = async (req, res, next) => {
    if(!req.body.refreshToken) return res.status(400).send("No Token")
    const token = req.body.refreshToken
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userData) => {
        if(err) return next(createError(401, "Token is invalid"))
        
        let { iat, exp, ...user } = userData
        const authUser = await Login.findOne({ where:{ id: user.loginId }})
        user.role = authUser.role
        
        const accessToken = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn:'12h' })
        logger.info("Access Token generated using regresh token", {module: `Login Controller refreshToken`})
        
        return res.status(200).json({ user, accessToken })        
    })
}