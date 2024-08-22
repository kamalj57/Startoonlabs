const { Router } = require("express")

const router=Router()


const userController=require('../controllers/userController')

router.post('/api/v1/login',userController.loginUser);
router.post('/api/v1/signup',userController.signupUser)
router.get('/api/v1/getuser',userController.getUserData);
router.get('/api/v1/admin',userController.getAllUserData);
module.exports=router;
