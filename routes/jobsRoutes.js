const express = require('express');
const userAuth = require('../middleware/authMiddleware');
const {createJob,getAllJobs,updateJob,deleteJob,jobStats} = require('../controllers/jobsController');

const router = express.Router();

router.route('/create-job').post(userAuth,createJob);
router.route('/get-jobs').get(userAuth,getAllJobs);
router.route('/update-job/:id').patch(userAuth,updateJob);
router.route('/delete-job/:id').delete(userAuth,deleteJob);
router.route('/job-stats').get(userAuth,jobStats);

module.exports = router;