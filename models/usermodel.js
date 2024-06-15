const mongoose=require("mongoose");
 const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true, "enter name"]
    },
    email:{
        type:String,
        required: [true, "enter unique email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    confirmPassword:{
        type:String,
        required:[true,'password is required']
    }
 },
 {timestamps:true}
)
const usermodel=new mongoose.model('user',userSchema);
module.exports=usermodel;