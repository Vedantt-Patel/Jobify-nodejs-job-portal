const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        require: [true, 'Company name is required'],
    },
    position:{
        type:String,
        require: [true, 'Job Position is required'],
        maxlength: 100
    },
    workType:{
        type:String,
        enum:['full-time', 'part-time', 'remote'],
        default: 'full-time',
    },
    location:{
        type:String,
        default:'India',
        require: [true, 'Location is required'],
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
}, 
{timestamps:true}
)

module.exports = mongoose.model('Jobs',jobSchema);