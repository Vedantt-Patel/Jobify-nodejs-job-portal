const express = require('express');
const userUpdate = require('../controllers/userController');
const userAuth = require('../middleware/authMiddleware');

const router = express.Router();

//! These are all for the API documentation, kindly ignore them...The actual logic lies down below
/**
 * @swagger
 * /api/v1/user/user-update:
 *   put:
 *     summary: Update user information
 *     description: Updates user information with provided details, **May give output as "Invalid token"! Bearer token field updating soon...**
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Fname:
 *                 type: string
 *                 description: The first name of the user.
 *               Lname:
 *                 type: string
 *                 description: The last name of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               location:
 *                 type: string
 *                 description: The location of the user.
 *     responses:
 *       '200':
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 _id: "60c30e3873d37a001c8e2489"
 *                 Fname: John
 *                 Lname: Doe
 *                 email: john@example.com
 *                 location: New York
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Invalid request or missing required fields
 */


router.route('/user-update').put(userAuth, userUpdate);

module.exports = router;
