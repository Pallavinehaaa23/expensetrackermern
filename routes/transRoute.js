
const express=require("express");
const {addAll,getAll,edits,deltrans}=require("../controllers/transControl")
const router=express.Router();
router.post('/addtransaction',addAll);
router.post('/getAlltransaction',getAll);
router.post('/edittransaction',edits);
router.post('/deltransaction',deltrans);


module.exports=router;