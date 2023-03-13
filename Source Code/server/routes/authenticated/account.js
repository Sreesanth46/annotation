const router = require('express').Router()
const {adminToken}=require('../../middleware/verifyToken')
const accountController = require('../../controllers/AccountController')


router.post('/addaccount',adminToken, accountController.addAccount)

router.get('/getaccount/:id',adminToken,accountController.getAccountWithId)

router.get('/listaccounts',adminToken,accountController.getAccount)

router.put('/editaccount/:id',adminToken,accountController.editAccount)

router.put('/deleteaccount/:id',adminToken,accountController.deleteAccount)

router.post('/searchaccount',adminToken,accountController.searchAccount)

router.put('/resetpassword',adminToken,accountController.resetPassword)

module.exports = router