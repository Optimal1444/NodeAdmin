const express=require('express')
const adminController=require('../Controllers/adminController')
const authMiddleWare = require('../Middlewares/auth')
const loginValidationMiddleWare=require('../Middlewares/loginValidation')
const adminValidationMiddleWare=require('../Middlewares/adminValidation')
const multer  = require('multer')
const adminRouter=express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, 'my-uploads/')
        
    },
    filename: function (req, file, next) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const name=uniqueSuffix+'.'+file.originalname.split('.')[1]
        req.body.path=`my-uploads/${name}`
      next(null,name )
    }
  })
const upload = multer({ storage: storage })

adminRouter.get('',authMiddleWare.checkToken,adminController.getAll)
adminRouter.post('',upload.single('img'),authMiddleWare.checkToken,adminValidationMiddleWare.validateAdmin,adminController.addAdmin)
adminRouter.post('/login',loginValidationMiddleWare.validateLogin,adminController.loginAdmin)
adminRouter.put('/',authMiddleWare.checkToken,adminController.updateAdmin)
adminRouter.delete('',authMiddleWare.checkToken,adminController.deleteAdmin)
module.exports=adminRouter