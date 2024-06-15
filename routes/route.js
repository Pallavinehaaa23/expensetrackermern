const {loginUser} =require('../controllers/control')
const {regUser}=require('../controllers/control')
const express=require("express");
const router=express.Router();
router.post('/login',loginUser);
router.post('/register',regUser);

module.exports=router;
