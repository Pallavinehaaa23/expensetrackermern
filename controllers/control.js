const User=require("../models/usermodel");

const loginUser=async(req,res)=>{
try{
const {email,password} =req.body
const user=await User.findOne({email,password});
if(!user){
  return   res.status(404).send('User not found');
}
res.status(200).json({
    success:true,
    user
});
}
catch(err){
 res.status(400).json({
    success:false,
    err
 })
}
}
const regUser = async (req, res) => {
    try {
        const newuser = new User(req.body);
        // await newuser.validate(); // Validate against Mongoose schema
        await newuser.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newuser
        });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(400).json({
            success: false,
            message: "Failed to register user",
            error: err.message // Send meaningful error message to client
        });
    }
};



module.exports={loginUser,regUser};