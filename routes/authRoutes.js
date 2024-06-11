const express = require('express');
const router = express.Router();
const {newUser,login} = require('../controllers/authController.js');
const userAuth = require('../middleware/authMiddleware');

router.route('/register').post(newUser);
router.route('/login').post(login)

module.exports = router;