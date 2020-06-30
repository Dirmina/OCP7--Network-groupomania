const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const modoCtrl = require('../controllers/modos');

 
router.get('/comments', auth, modoCtrl.getAllComments);
router.get('/posts', auth, modoCtrl.getAllPosts);
router.delete('/comments/:id', auth, modoCtrl.deleteComment);
router.delete('/posts/:id', auth, modoCtrl.deletePost);


module.exports = router;
