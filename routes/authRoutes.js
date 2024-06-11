const express = require('express');
const router = express.Router();
const {newUser,login} = require('../controllers/authController.js');
const userAuth = require('../middleware/authMiddleware');

//! These are all for the API documentation, kindly ignore them...The actual logic lies down below
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with provided information!
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Fname
 *               - email
 *               - password
 *             properties:
 *               Fname:
 *                 type: string
 *                 description: The first name of the user.
 *               Lname:
 *                 type: string
 *                 description: The last name of the user.
 *               email:
 *                 description: The email address of the user.
 *                 type: string
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *               location:
 *                 type: string
 *                 description: The location of the user.
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: Registered successfully
 *               user:
 *                 _id: "60c30e3873d37a001c8e2489"
 *                 Fname: John
 *                 email: john@example.com
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Invalid request or missing required fields
 *       '409':
 *         description: User already exists
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with existing credentials
 *     description: Authenticates a user with provided email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: Login successful
 *               user:
 *                 _id: "60c30e3873d37a001c8e2489"
 *                 Fname: John
 *                 email: john@example.com
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Invalid request or missing required fields
 *       '401':
 *         description: Incorrect password
 *       '404':
 *         description: User not found, please try signing up
 */

router.route('/register').post(newUser);


router.route('/login').post(login)

module.exports = router;
