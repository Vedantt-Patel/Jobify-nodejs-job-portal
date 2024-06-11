const express = require('express');
const userUpdate = require('../controllers/userController');
const userAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/user-update').put(userAuth, userUpdate);

module.exports = router;