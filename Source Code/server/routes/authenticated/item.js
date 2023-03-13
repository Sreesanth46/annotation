const router=require('express').Router()
const {verifyToken}=require('../../middleware/verifyToken')
const itemController=require('../../controllers/ItemController')
const { upload } = require('../../middleware/imageUpload')

// for adding item
router.post('/additem',verifyToken, upload.single('file'), itemController.addItem)

// for geting single item
router.get('/getitem/:id',verifyToken,itemController.getItem)

// for geting item list
router.get('/getitem',verifyToken,itemController.listItem)

// for editing item
router.put('/edititem/:id',verifyToken,itemController.editItem)

// for deleting item
router.put('/deleteitem/:id',verifyToken,itemController.deleteItem)

// for search item
router.get('/searchitem',verifyToken,itemController.searchItem)

module.exports = router