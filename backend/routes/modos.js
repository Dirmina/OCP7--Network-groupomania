//Modules :
const express = require('express');
const router = express.Router();

//Middleware :
const auth = require('../middleware/auth');

//controlleurs :
const modoCtrl = require('../controllers/modos');

 //Routes :
router.get('/comments', auth, modoCtrl.getAllComments);
router.get('/posts', auth, modoCtrl.getAllPosts);
router.delete('/comments/:id', auth, modoCtrl.deleteComment);
router.delete('/posts/:id', auth, modoCtrl.deletePost);


module.exports = router;
