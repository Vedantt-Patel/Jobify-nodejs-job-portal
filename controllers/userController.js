const userModel = require("../models/userModel");
const { createCustomError } = require("../errors/custom-error");

const userUpdate = async (req,res,next)=>{
    const {Fname,Lname,email,location} = req.body;
    if(!Fname || !Lname || !email || !location)
    {
        return next(createCustomError("Please provide all the details",400));
    }
    const user = await userModel.findOne({_id:req.user.userID});
    user.Fname = Fname;
    user.Lname = Lname;
    user.email = email;
    user.location = location;

    await user.save();
    const token = user.createJWT();
    res.status(200).json({user,token});
}

module.exports = userUpdate;
