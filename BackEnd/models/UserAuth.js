const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String, required:true},
    lastlogin:{type:Date},
    isVerified: { type: Boolean, default: false },
    mobileNo:{type:Number,required:true},
    otp:{type:String},
    otpExpiry:{type:Date},
    purchased:{type:[]},
    cart:{type:[]}
});
module.exports = mongoose.model('User',userSchema);
