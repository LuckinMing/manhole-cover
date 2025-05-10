const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth.middleware');
const { validate, userSchemas } = require('../middleware/validation.middleware');

// 公开路由
router.post('/register', validate(userSchemas.register), authController.register);
router.post('/login', validate(userSchemas.login), authController.login);

// 需要认证的路由
router.get('/profile', auth, authController.getProfile);
router.patch('/profile', auth, authController.updateProfile);

module.exports = router;
