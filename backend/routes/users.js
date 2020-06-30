const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id', auth, userCtrl.seeAProfile);
router.delete('/profile/:id', auth, userCtrl.deleteUser);
router.put('/profile/:id', auth, multer, userCtrl.updateUser);

module.exports = router;