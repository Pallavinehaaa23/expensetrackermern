const mongoose=require("mongoose");
 const transSchema= new mongoose.Schema({
  userid:{
    type:String,
    required:true
  },
   amount:{
    type:Number,
    required:[true,"amount is reqd"]
   },
   type:{
    type:String,
    required:true
   },
   category:{
    type:String,
    required:[true,"please enter category"]
   },
   reference:{
    type:String,
  
   },
   description:{
    type:String,
    required:[true,"desc reqd"]
   },
   date:{
    type:Date,
    required:[true,"date reqd"]
   },
   
  

 }, {timestamps:true})
 const Transmodel= new mongoose.model('transaction',transSchema);
 module.exports=Transmodel;