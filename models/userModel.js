const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    Fname:{
        type:String,
        required:[true,'Please enter the Name'],
    },
    Lname:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'Please enter the E-mail'],
        unique:true,
        validate: validator.isEmail,
    },
    password:{
        type:String,
        required:[true,'Please enter the Password'],
        minlength:[8, 'Password length must be greater than 8 characters'],
    },
    location:{
        type:String,
        default:'India',
    }
  },
  {timestamps:true}
);

userSchema.pre('save', async function() {
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePass = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password);
}

userSchema.methods.createJWT = function(){
    return jwt.sign({userID:this._id},process.env.JWT_Secret,{expiresIn:'1d'});
}

module.exports = mongoose.model('Users',userSchema);