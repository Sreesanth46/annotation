const router = require('express').Router()
const registerationController = require('../../controllers/RegisterationController')

router.post('/', registerationController.register)

router.post('/signup', registerationController.signUp)

router.get('/verify', registerationController.verifyToken)

router.post('/user', registerationController.findUserByEmail)

router.post('/company', registerationController.findCompanyByEmail)

router.post('/company/code', registerationController.findCompanyByCode)

router.post('/user/accountid', registerationController.findUserByAccountId)

module.exports = router