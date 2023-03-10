const { accountValidation } = require('../middleware/validation')
const db = require('../models')
const Login = db.login_master
const User = db.user_master
const Company = db.company_master
const nodeMailer = require('../utils/nodeMailer')
const template = require('../views/template')
const bcrypt = require('bcrypt')
const {actionLog}=require('./ActionLogController')

const { createError, throwErrorCode } = require('../error/error')

const { Op } = require('sequelize');
const logger = require('../logger')

//function for password generation
function generatePassword() {
  let password = 'Ann0';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  const passwordLength = Math.floor(Math.random() * (15 - 8 + 1)) + 8;

  for (let i = 0; i < passwordLength; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  if (!/[A-Z]/.test(password)) {
    password = password.slice(0, passwordLength - 4) + 'Aa1!';
  } else if (!/\d/.test(password)) {
    password = password.slice(0, passwordLength - 4) + '1Aa!';
  } else if (!/[!@#$%&*]/.test(password)) {
    password = password.slice(0, passwordLength - 4) + '!A1';
  }

  return password;
}

//for adding account
exports.addAccount = async (req, res) => {

    const { error } = accountValidation(req.body)                                  //validating request
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message));

    //check whether the admin can add owner
    if (req.user.role > req.body.role) return res.status(500).json(throwErrorCode("1907 | An unexpected error occured(admin can't add owner)"))
    
    //check whether the entered email has already taken
    let user = await User.findOne({ where: { email: req.body.email } })
    if (user) return res.status(404).json(throwErrorCode("3003 | Email id already exist")) 

    user = await User.findOne({ where: { accountId: req.body.accountId } })
    if (user) return res.status(404).json(throwErrorCode("3002 | Account id already exist"))                 //check whether the entered account id has already taken

    //for password generation
    const generatedPassword = generatePassword()
    const encryptedPassword = await bcrypt.hash(generatedPassword, 10)       //encrypting autogenerated password

    const t = await db.sequelize.transaction();
    try {
        // Create a user 
        user = await User.create({

            nickName: req.body.nickName,
            accountId: req.body.accountId,
            department: req.body.departmentName,
            jobTitle: req.body.jobTitle,
            email: req.body.email,
            companyId: req.user.companyId,
            disallowCollaboration: req.body.disallowCollaboration,
            profileEditing: req.body.profileEditing
        }, {
            transaction: t
        })

        // Save authentication informations.
        await Login.create({
            accountId: user.accountId,
            email: user.email,
            password: encryptedPassword,
            userId: user.id,
            role: req.body.role
        }, {
            transaction: t
        })

        await t.commit();
    } catch (err) {
        logger.warn(`${err}`, {module: `add account`})
        await t.rollback();
        return res.status(500).json(throwErrorCode("1909 | An unexpected error occurred (Transaction failed)"))
    }
    const accountId = req.body.accountId
    const mailBody = template.addAccount(accountId, generatedPassword)
    const subject = `Annotation Tool Account`
    nodeMailer.sendMail(mailBody, req.body.email, subject)
    actionLog(req.user.userId, `Add Account`, `Create`)
    return res.status(200).json(user)

}


//for getting single account
exports.getAccountWithId = async (req, res) => {

    const user = await User.findOne({ where: { 
        [Op.and]: [ 
            { id: req.params.id },
            { companyId: req.user.companyId },
            { status: { [Op.ne]: 99 } } ] },
        include: { model: Login,
            as: 'auth',
            attributes: ['role', 'passwordChange', 'lastLogin'],
        }});
    if(user == null) return res.status(404).json(throwErrorCode("4007 | Account does not exist"))

    const company = await Company.findOne({ where: { id: user.companyId }})
    if(company == null) return res.status(404).json(throwErrorCode("4007 | Account does not exist"))

    actionLog(req.user.userId, `User Account`, `view`)

    return res.status(200).json({user, company});
}

//for getting all account
exports.getAccount = async (req, res) => {

    const user = await User.findAll({ where: { 
        [Op.and]: [ 
            { companyId: req.user.companyId },
            { status: { [Op.ne]: 99 } } ] },
        include: { model: Login,
            as: 'auth',
            attributes: ['role', 'passwordChange', 'lastLogin'],
        }});
    if(user == null) return res.status(404).json(throwErrorCode("4007 | Account does not exist"))

    actionLog(req.user.userId, `Get Account`, `Get`)
    return res.status(200).json(user)
}

// for edit account
exports.editAccount = async (req, res) => {
    
    const { error } = accountValidation(req.body)                                  //validating request
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message))

    //check whether the admin can edit owner
    if (req.user.role > req.body.role) return res.status(500).json(throwErrorCode("1907 | An unexpected error occured (admin can't edit owner)"))

    let emailChanged = false, accountIdChanged = false

    let user = await User.findOne({ where: { id: req.params.id } })
    if(user == null) return res.status(400).json(throwErrorCode("4007 | Account does not exist"))

    // check whether the entered email is same as the already existing email
    if(user.email !== req.body.email) {
        emailChanged = true
        const findByEmail = await User.findOne({ where: { email: req.body.email } })
        if(findByEmail != null) return res.status(404).json(throwErrorCode("3003 | Email id already exist"))
    }

    // check whether the entered accountId is same as the already existing accountId
    if(user.accountId !== req.body.accountId) {
        accountIdChanged = true
        const findByAccountId = await User.findOne({ where: { accountId: req.body.accountId }})
        if(findByAccountId != null) return res.status(404).json(throwErrorCode("3002 | Account id already exist"))
    }

    const login = await Login.findOne({ where: { userId: req.params.id } })

    const t = await db.sequelize.transaction();

    try {
        await user.update({
            nickName: req.body.nickName,
            accountId: req.body.accountId,
            department: req.body.departmentName,
            jobTitle: req.body.jobTitle,
            email: req.body.email,
            companyId: req.user.companyId,
            disallowCollaboration: req.body.disallowCollaboration,
            profileEditing: req.body.profileEditing
        }, {  transaction: t });

        await login.update({
            accountId: req.body.accountId,
            email: req.body.email,
            role: req.body.role
        }, { transaction: t })
        
        await t.commit();

    } catch (err) {
        logger.warn(`${err}`, {module: `edit account`})
        await t.rollback();
        return res.status(500).json(throwErrorCode("1909 | An unexpected error occurred (Transaction failed)"))
    }

    // mail service on email and accountId change
    if (emailChanged && accountIdChanged) {
        const mailBody = template.editAccount1(req.body.accountId, req.body.email)
        const subject = `Annotation Tool Account`
        nodeMailer.sendMail(mailBody, req.body.email, subject)
        actionLog(req.user.userId, `Edit Account`, `Edit`)
        return res.status(200).json({message: "Email and Account Id Updated"})
    }

    // mail service on email change 
    if (emailChanged) {
        const mailBody = template.editAccount("Email", req.body.email)
        const subject = `Annotation Tool Account`
        nodeMailer.sendMail(mailBody, req.body.email, subject)
        actionLog(req.user.userId, `Edit Account`, `Edit`)
        return res.status(200).json({message: "Email Id Updated"})
    }

    // mail service on accountId change
    if (accountIdChanged) {
        const mailBody = template.editAccount("Account Id", req.body.accountId)
        const subject = `Annotation Tool Account`
        nodeMailer.sendMail(mailBody, req.body.email, subject)
        actionLog(req.user.userId, `Edit Account`, `Edit`)
        return res.status(200).json({message: "AccountId updated"})
    }

    // email and account id are not changed
    actionLog(req.user.userId, `Edit Account`, `Edit`)
    return res.status(200).json({message: "Account information updated"})
}

//for delete account
exports.deleteAccount = async (req, res) => {


    //check whether the admin can delete owner
    if (req.user.role > req.body.role) return res.status(500).json(throwErrorCode("1907 | An unexpected error occured (admin can't delete owner)"))

    const date = new Date()
    const user = await User.findOne({ where: { id: req.params.id }});

    if(user == null) return res.status(404).json(throwErrorCode("2801 | Account not found"))

    // Check whether the user is the creater of a company
    const company = await Company.findOne({ where: { email: user.email } });
    if(company !== null) return res.status(500).json(throwErrorCode("1908 | An unexpected error occured (No one can delete company owner)"))

    const login = await Login.findOne({where:{userId:req.params.id}})

    // check whether the admin can delete owner
    if (req.user.role > login.role) return res.status(500).json(throwErrorCode("1907 | An unexpected error occured (admin can't delete owner)"))

    const deletedEmail = `${user.email} ${date}`
    const deletedAccuntId = `${user.accountId} ${date}`

    const t = await db.sequelize.transaction();

    try {

        await user.update({ 
            status: 99,
            email: deletedEmail,
            accountId: deletedAccuntId
        }, { transaction: t });

        await login.update({ 
            status: 99,
            email: deletedEmail,
            accountId: deletedAccuntId
        }, { transaction: t });

        await t.commit();
        
    } catch (err) {

        logger.warn(`${err}`, {module: `delete account`})
        await t.rollback();
        return res.status(500).json(throwErrorCode("1909 | An unexpected error occured (Transaction failed)"))
        
    }

    actionLog(req.user.userId, `Delete Account`, `Delete`)
    return res.status(200).send("Account Deleted")
}

//for search account
exports.searchAccount = async (req, res, next) => {

    const user = await User.findAll({ where: {
        [Op.and]: [
            { status: { [Op.ne]: 99 }},
            { companyId: req.user.companyId },
            {
                [Op.or]: [
                    { email: { [Op.like]: `%${req.body.search}%`} },
                    { accountId: { [Op.like]: `%${req.body.search}%` } },
                    { nickName: { [Op.like]: `%${req.body.search}%` } }
                ]
            }
        ]
    },
    include: { model: Login,
        as: 'auth',
        attributes: ['role', 'passwordChange', 'lastLogin'],
    }});
    
    if (user== null) return res.status(404).json(throwErrorCode("2007 | AccountId / Nickname / EmailId not found"))
    
    actionLog(req.user.userId, `Search Account`, `Search`)
    return res.status(200).json(user)
}

exports.resetPassword = async (req, res, next) => {

    const login = await Login.findOne({ where: { accountId: req.body.accountId }})
    if(login == null) return res.status(404).json(throwErrorCode("4007 | Account does not exist"))

    const generatedPassword = generatePassword();
    const encryptedPassword = await bcrypt.hash(generatedPassword, 10);
    const datetime = new Date();

    await login.update({
        password: encryptedPassword,
        passwordChange: datetime
    })

    const mailBody = template.resetPassword(login.accountId, generatedPassword)
    const subject = `Password reset`
    nodeMailer.sendMail(mailBody, login.email, subject)
    actionLog(req.user.userId, `Reset password userId: ${login.userId}`, `Edit`)
    return res.status(200).json({message: "Password reset"})

}