const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/update/:id', authController.update);

router.post('/delete/:id', authController.deleteUser);

router.get('/logout', authController.logout);

router.post('/adduser', authController.adduser);

router.post('/edit/:id', authController.edit);

router.post('/uploadForm', authController.uploadForm)


module.exports = router;