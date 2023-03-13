const nodeMailer = require('../utils/nodeMailer')
const template = require('../views/template')
const bcrypt = require('bcrypt')
const db = require('../models');
const User = db.user_master;
const Login = db.login_master;
const Company = db.company_master;
const logger = require('../logger')
const { actionLog } = require('../controllers/ActionLogController');
const { profileUpdateVaildation, changePasswordValidation } = require("../middleware/validation");
const { throwErrorCode } = require('../error/error');

// Get current user profile
exports.list = async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.user.userId },
        include: { model: Login,
            as: 'auth',
            attributes: ['role', 'passwordChange', 'lastLogin'],
        }});
    if(user == null) return res.status(400).send("message: No User found");

    const company = await Company.findOne({ where: { id: req.user.companyId }})
    if(company == null) return res.status(400).send("message: No company found");

    actionLog(req.user.userId, `profile`, `view`)
    return res.status(200).json({user, company})
}

// Update current user profile
exports.update = async (req, res, next) => {
    let emailFlag = false
    let currentEmail

    const { error } = await profileUpdateVaildation(req.body);
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message));

    const user = await User.findOne({ where: { id: req.user.userId }});
    if(user == null) return res.status(400).send("message: No User found");

    // check if user is changing email
    if(user.email !== req.body.email) {
        emailFlag = true
        currentEmail = user.email;
    }

    // check if a user with that email already exists
    if(emailFlag) {
        const userCheck = await User.findOne({ where: { email: req.body.email }});
        if(userCheck != null) return res.status(400).send("message: User with email already exists") 
    }

    const company = await Company.findOne({ where: { email: user.email }});

    const login = await Login.findOne({ where: { id: req.user.userId }});
    if(login == null) return res.status(400).send("message: No User found");

    const t = await db.sequelize.transaction();

    try {

        if(req.file == null || undefined) {
            await user.update({
                nickName: req.body.nickName,
                department: req.body.departmentName,
                jobTitle: req.body.jobTitle,
                email: req.body.email,
            }, { transaction: t });
        } else {
            await user.update({
                nickName: req.body.nickName,
                department: req.body.departmentName,
                jobTitle: req.body.jobTitle,
                email: req.body.email,
                profilePic: `http://annotation.innovaturelabs-images.infra/${req.file.filename}`
            }, { transaction: t });
        }

        if(emailFlag) {
            await login.update({
                email: req.body.email
            }, { transaction: t });
        }

        // if user is the owner of the company
        if(company != null) {
            await company.update({
                email: req.body.email
            })
        }

        await t.commit();

    } catch (err) {
        logger.warn(`${err}`, {module: `Profile Update`})
        await t.rollback();
        return res.status(400).json({ message: "Something went wrong please try again"})
    }
    
    if(emailFlag) {
        // notify user that the password has changed
        const name = `${user.firstName} ${user.lastName}`
        const mailBody = template.updateEmail(name, currentEmail, req.body.email);
        const subject = `Email updated`;
        nodeMailer.sendMail(mailBody, currentEmail, subject)
    }
    actionLog(req.user.userId, `profile`, `update`)
    return res.status(201).json(user)
}

exports.changePassword = async (req, res, next) => {
    if(req.body.newPassword === req.body.currentPassword) return res.status(400).json({message: "New password cannot be same as old password"})

    const { error } = await changePasswordValidation(req.body);
    if (error) return res.status(400).json(throwErrorCode(error.details[0].message));

    const login = await Login.findOne({ where: { id: req.user.loginId }});
    if(login == null) return res.status(400).send("message: No User found");

    const user = await User.findOne({ where: { id: req.user.userId }});

    const isEqual = await bcrypt.compare(req.body.currentPassword, login.password)
    if(!isEqual) return res.status(400).json({message: "Incorrect password"})

    const encryptedPassword = await bcrypt.hash(req.body.newPassword, 10)

    const datetime = new Date()
    const t = await db.sequelize.transaction();

    try {
        await login.update({
            password: encryptedPassword,
            passwordChange: datetime
        }, {
            where: { id: req.user.userId },
            transaction: t 
        });
        await t.commit();
    } catch (err) {
        logger.warn(`${err}`, {module: `Profile changePassword`})
        await t.rollback();
        return res.status(400).json({ message: "Something went wrong please try again"})
    }
    // notify user that the password has changed
    let name = `${user.firstName} ${user.lastName}`
    if(name.length < 3) name = user.nickName
    
    const mailBody = template.updatePassword(name);
    const email = user.email;
    const subject = `Password updated`;
    nodeMailer.sendMail(mailBody, email, subject)

    actionLog(req.user.userId, `profile/password`, ` update`)
    return res.status(201).json({message: "password updated successfully"})
    
}

exports.getCompanyProfile = async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.user.userId }});
    if(user == null) return res.status(400).send("message: No User found");
    const company = await Company.findOne({ where: { id: user.companyId }});
    if(company == null) return res.status(400).send("message: No Company found");

    actionLog(req.user.userId, `profile/getCompanyProfile`, `view`)
    return res.status(200).json({user, company})
}