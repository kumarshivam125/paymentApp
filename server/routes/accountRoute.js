const express=require('express');
const { auth } = require('../middleware/auth');
const {getBalance}=require('../controller/UserController');
const {transferAmount}=require('../controller/AccountController');

const router=express.Router();

router.get("/balance",auth,getBalance);
router.post("/transfer",auth,transferAmount);

module.exports=router;