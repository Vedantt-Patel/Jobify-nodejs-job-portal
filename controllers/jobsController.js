const jobsModel = require("../models/jobsModel");
const { createCustomError } = require("../errors/custom-error");
const { default: mongoose } = require("mongoose");

const createJob = async (req,res,next) => {
    const {company,position} = req.body;
    if (!company)
    {
        return next(createCustomError("Please provide company name", 400));
    }
    if (!position)
    {
        return next(createCustomError("Please provide the position", 400));
    }
    req.body.createdBy = req.user.userID;
    const job = await jobsModel.create(req.body);
    res.status(201).json({job});
};

const getAllJobs = async (req, res, next) => {
    const { workType, search, sort } = req.query;
    const queryObject = {
      createdBy: req.user.userID,
    };
    if (workType && workType !== 'all') {
      queryObject.workType = workType;
    }
    if (search) {
      queryObject.position = { $regex: search, $options: 'i' };
    }
    let queryResult = jobsModel.find(queryObject);

    //* Sorting
    if (sort === 'latest') {
      queryResult = queryResult.sort({ createdAt: -1 });
    }
    if (sort === 'oldest') {
      queryResult = queryResult.sort({ createdAt: 1 });
    }
    if (sort === 'a-z') {
      queryResult = queryResult.sort({ position:1 });
    }
    if (sort === 'z-a') {
      queryResult = queryResult.sort({ position:-1 });
    }

    //* Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    queryResult.skip(skip).limit(limit);
    const jobsCount = await jobsModel.countDocuments(queryResult);
    const numOfPage = Math.ceil(jobsCount/limit); 

    const jobs = await queryResult;
    res.status(200).json({ jobsCount, jobs, numOfPage });
  };
  

const updateJob = async (req,res,next)=>{
    const Id = req.params.id;
    const {company,position} = req.body;
    if(!company || !position)
    {
        return next(createCustomError("Please provide all fields", 400));
    }
    const job = await jobsModel.findOne({_id:Id});
    if(!job)
    {
        return next(createCustomError("Job not found", 404));
    }
    if(!(req.user.userID===job.createdBy.toString()))
    {
        return next(createCustomError("You are not authorized to make changes to this job", 400));
    }
    const updatedJob = await jobsModel.findOneAndUpdate({_id:Id}, req.body,{
        new:true,
        runValidators:true,
    })
    res.status(200).json({msg:"Job Updated!",updatedJob});
}

const deleteJob = async(req,res,next)=>{
    const Id = req.params.id;
    const job = await jobsModel.findOne({_id:Id});
    if(!job)    
    {
        return next(createCustomError("Job not found", 404));
    }
    if(!(req.user.userID===job.createdBy.toString()))
    {
        return next(createCustomError("You are not authorized to Delete this job", 400));
    }
    const deletedJob = await jobsModel.findByIdAndDelete({_id:Id});
    res.status(200).json({msg:"Job Deleted!",deleteJob});
}

const jobStats = async(req,res)=>{
    const stats = await jobsModel.aggregate([
        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(req.user.userID),
            }
        },
        {
            $group:{
                _id:'$workType',
                count: {$sum:1},
            }
        }
    ])
    // const defaultStats = {
    //     "full-time": stats.full-time || 0,
    //     "contaract": stats.contaract || 0,
    //     "part-time": stats.part-time || 0,
    //     "internship": stats.internship || 0,
    // }
    res.status(200).json({totalJob:stats.length, stats});
}

module.exports = {createJob,getAllJobs,updateJob,deleteJob,jobStats};