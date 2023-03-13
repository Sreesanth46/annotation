const jwt = require('jsonwebtoken')
const template = require('../views/template')
const nodeMailer = require('../utils/nodeMailer')
const bcrypt = require('bcrypt')
const db = require('../models')
const Company  = db.company_master
const User  = db.user_master
const Login  = db.login_master
const { Op } = require('sequelize');

const logger = require('../logger')
const { createError, throwErrorCode } = require('../error/error');
const { registerValidation, emailValidation } = require("../middleware/validation");
const { actionLog } = require('../controllers/ActionLogController')

const secretKey = process.env.MAIL_TOKEN_SECRET
const clientUrl = process.env.CLIENT_URL

// initial signup - verify email
exports.signUp = async (req, res, next) => {

    const { error } = await emailValidation(req.body);
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message));

    let user = { email: req.body.email, message: `Link expires in 1 hour` }
    const token = await jwt.sign( {...user}, secretKey, {expiresIn: '1h'})
    const url = `${clientUrl}/signup?token=${token}`
    const mailBody = template.verifyMail(url)
    const email = req.body.email
    const subject = `Annotation Tool Registertion`
    nodeMailer.sendMail(mailBody, email, subject)
    return res.status(200).json({message: `Success. Please check your email to complete the registration`})
}

// verify token for registration
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        const user = jwt.verify(token, secretKey);
        req.user = user;
        logger.info("Token Verified", {module: `verifyToken`})
        return res.status(200).json({success: true, status: 200, message: 'Token verified'})
    } catch (err) {
        logger.warn("Invalid Token", {module: `verifyToken`})
        return next(createError(403, "Token is invalid"))
    }

}

// register a company
exports.register = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        const verifyUser = await jwt.verify(token, secretKey);
        req.user = verifyUser;
    } catch (err) {
        logger.warn("registeration faild due to invalid token", {module: `register`})
        return next(createError(401, "Token is invalid"))
    }

    // Validate request body
    const { error } = await registerValidation(req.body);
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message));

    // Check if a company already exist with the given email 
    let company = await Company.findOne({ where: { email: req.user.email } });
    if (company != null) return res.status(400).json({ message: "Company with this mail already exist"})

    // Check if a user already exist with the given email 
    let user = await User.findOne({ where: { [Op.or]: [{ email: req.user.email }, { accountId: req.body.accountId }] } });
    if (user != null) return res.status(400).json({ message: "User with this mail already exist"})

    const encryptedPassword = await bcrypt.hash(req.body.password, 10)

    const t = await db.sequelize.transaction();

    // Creating a company, user, authUser with provided details
    try {

        company = await Company.create({
            name: req.body.name,
            remaining_account: 10,
            code: req.body.code,
            email: req.user.email,
            collabration: 0,
        }, { transaction: t });

        user = await User.create({
            accountId: req.body.accountId,
            email: company.email,
            companyId: company.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            disallowCollaboration: 1,
            profileEditing: 1
        }, { transaction: t });

        await Login.create({
            userId: user.id,
            accountId: user.accountId,
            email: user.email,
            password: encryptedPassword
        }, { transaction: t });

        await t.commit();

    } catch (err) {
        logger.warn(`${err}`, {module: `registeration`})
        await t.rollback();
        return res.status(400).json({ message: "Something went wrong please try again"})
    }

    actionLog(user.id, `register`, `create`)
    return res.status(201).json({ company, user })
}

// check if a company already exists with a given email
exports.findCompanyByEmail = async (req, res, next) => {
    if(!req.body.email) return res.status(400).json({ message: "Email is required"})
    const company = await Company.findOne({ where: { email: req.body.email }});
    if(company === null) {
        return res.status(200).json({CompanyFound : false})
    } else {
        return res.status(200).json({CompanyFound : true})
    }
}

// check if a company code already exists
exports.findCompanyByCode = async (req, res, next) => {
    if(!req.body.code) return res.status(400).json({ message: "Code is required"})
    const company = await Company.findOne({ where: { code: req.body.code }});
    if(company === null) {
        return res.status(200).json({CompanyFound : false})
    } else {
        return res.status(200).json({CompanyFound : true})
    }
}

// check if a user already exists with a given email
exports.findUserByEmail = async (req, res, next) => {
    if(!req.body.email) return res.status(400).json({ message: "Email is required"})
    const user = await User.findOne({ where: { email: req.body.email }});
    if(user === null) {
        return res.status(200).json({userFound : false})
    } else {
        return res.status(200).json({userFound : true})
    }
}

// check if a accountId already exists
exports.findUserByAccountId = async (req, res, next) => {
    if(!req.body.accountId) return res.status(400).json({ message: "AccountId is required"})
    const user = await User.findOne({ where: { accountId: req.body.accountId }});
    if(user === null) {
        return res.status(200).json({userFound : false})
    } else {
        return res.status(200).json({userFound : true})
    }
}