const express = require('express');
const userAuth = require('../middleware/authMiddleware');
const {createJob,getAllJobs,updateJob,deleteJob,jobStats} = require('../controllers/jobsController');

const router = express.Router();

//! These are all for the API documentation, kindly ignore them...The actual logic lies down below
/**
 * @swagger
 * /api/v1/job/create-job:
 *   post:
 *     summary: Create a new job
 *     description: Creates a new job listing with provided information, **you will need to provide the bearer token**!
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 description: The name of the company offering the job.
 *               position:
 *                 type: string
 *                 description: The position/title of the job.
 *     responses:
 *       '201':
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             example:
 *               job:
 *                 _id: "60c30e3873d37a001c8e2489"
 *                 company: "Example Company"
 *                 position: "Software Engineer"
 *       '400':
 *         description: Invalid request or missing required fields
 *       '401':
 *         description: Unauthorized, missing or invalid token
 */

/**
 * @swagger
 * /api/v1/job/get-jobs:
 *   get:
 *     summary: Get all jobs
 *     description: Retrieve a list of all jobs. **You need to be authenticated to access this endpoint**!
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobsCount:
 *                   type: integer
 *                   description: The total number of jobs matching the query criteria.
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 numOfPage:
 *                   type: integer
 *                   description: The total number of pages based on pagination.
 *       '401':
 *         description: Unauthorized, missing or invalid token
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the job.
 *         company:
 *           type: string
 *           description: The name of the company offering the job.
 *         position:
 *           type: string
 *           description: The position/title of the job.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the job was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the job was last updated.
 *       required:
 *         - company
 *         - position
 */

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     summary: Update a job
 *     description: Updates an existing job listing with provided information, **you will need to provide the bearer token**!
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 description: The name of the company offering the job.
 *               position:
 *                 type: string
 *                 description: The position/title of the job.
 *     responses:
 *       '200':
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Job Updated!"
 *               updatedJob:
 *                 _id: "60c30e3873d37a001c8e2489"
 *                 company: "Updated Company"
 *                 position: "Updated Position"
 *       '400':
 *         description: Invalid request or missing required fields
 *       '401':
 *         description: Unauthorized, missing or invalid token
 *       '404':
 *         description: Job not found

 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     summary: Delete a job
 *     description: Deletes an existing job listing, **you will need to provide the bearer token**!
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to delete.
 *     responses:
 *       '200':
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Job Deleted!"
 *       '401':
 *         description: Unauthorized, missing or invalid token
 *       '404':
 *         description: Job not found

 * @swagger
 * /api/v1/job/job-stats:
 *   get:
 *     summary: Get job statistics
 *     description: Retrieves statistics about the jobs created by the authenticated user.
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Job statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJob:
 *                   type: integer
 *                   description: The total number of jobs created by the user.
 *                 stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The type of job (e.g., full-time, part-time).
 *                       count:
 *                         type: integer
 *                         description: The count of jobs of this type created by the user.
 *       '401':
 *         description: Unauthorized, missing or invalid token
 */



router.route('/create-job').post(userAuth,createJob);
router.route('/get-jobs').get(userAuth,getAllJobs);
router.route('/update-job/:id').patch(userAuth,updateJob);
router.route('/delete-job/:id').delete(userAuth,deleteJob);
router.route('/job-stats').get(userAuth,jobStats);

module.exports = router;
