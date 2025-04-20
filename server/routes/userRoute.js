const express=require('express');
const router=express.Router();
const {signup,login}=require('../controller/Auth');
const {updateProfile,getUsers}=require('../controller/UserController');
const {auth}=require('../middleware/auth');

router.post("/signup",signup);
router.post("/login",login);
router.post("/update",auth,updateProfile);
router.get("/bulk",getUsers);

module.exports=router;