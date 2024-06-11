const userModel = require('../models/userModel');
const { createCustomError } = require('../errors/custom-error');

//* For New Users (Register)
const newUser = async (req,res,next)=>{
        const { Fname,email,password } = req.body;
        if(!Fname)
        {
            return next(createCustomError("Please provide the First Name!", 400));
        }
        if(!email)
        {
            return next(createCustomError("Please provide the E-mail!", 400));
        }
        if(!password)
        {
            return next(createCustomError("Please provide the Password!", 400));
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return next(createCustomError("User already exists!", 400));
        }
        const user = await userModel.create(req.body);
        const token = user.createJWT();
        res.status(201).send({msg:'Registered successfully',user,token});
}

//* For Existing Users (Login)
const login = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email)
    {
        return next(createCustomError("Please provide the E-mail!", 400));
    }
    if(!password)
    {
        return next(createCustomError("Please provide the Password!", 400));
    }
    const user = await userModel.findOne({email});
    if(!user){
        return next(createCustomError("User doesn't exist, Please try signing up!", 404));
    }
    const isMatch = await user.comparePass(password);
    if(!isMatch)
    {
        return next(createCustomError("Incorrect Password!", 401));
    }
    const token = user.createJWT();
    res.status(200).json({msg:'Login successful',user,token});
}

module.exports = {newUser,login};