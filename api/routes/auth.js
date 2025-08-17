const express = require('express');
const router = express.Router();
const { adminLogin, getAdminProfile, changePassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', adminLogin);

// @route   GET /api/admin/profile
// @desc    Get admin profile
// @access  Private
router.get('/profile', auth, getAdminProfile);

// @route   PUT /api/admin/change-password
// @desc    Change admin password
// @access  Private
router.put('/change-password', auth, changePassword);

module.exports = router;
