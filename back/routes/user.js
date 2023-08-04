const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
//
//
//
router.post('/record', userController.recordUser);
router.post('/login', userController.login);
router.put('/update/:id', userController.updateUser);

//
//
//
module.exports = router;