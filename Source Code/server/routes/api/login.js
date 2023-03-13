const router = require('express').Router()
const loginController = require('../../controllers/LoginController')


router.post('/', loginController.login)

router.post('/forgotpassword',loginController.forgotPassword)

router.put('/resetpassword',loginController.resetPassword)

router.post('/verifyToken', loginController.verifyToken)

router.post('/refreshToken', loginController.refreshToken)

module.exports = router