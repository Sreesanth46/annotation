const router = require('express').Router();
const { verifyToken } = require('../../middleware/verifyToken');
const profileController = require('../../controllers/ProfileController');
const { upload } = require('../../middleware/imageUpload')

router.get('/', verifyToken, profileController.list)

router.put('/', verifyToken, upload.single('image'), profileController.update)

router.put('/password', verifyToken, profileController.changePassword)

router.get('/companyProfile', verifyToken, profileController.getCompanyProfile)

module.exports = router