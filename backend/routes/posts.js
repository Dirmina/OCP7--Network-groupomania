//Modules :
const express = require('express');
const router = express.Router();

//Middlewares :
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Controlleur :
const postsCtrl = require('../controllers/posts');

//Routes :
router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:id', auth, postsCtrl.getAPosts);
router.post('/', auth, postsCtrl.createPost);
router.patch('/:id', auth, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost); 


//router.post('/:id/like', auth, postsCtrl.postLike);
 
router.get('/:id/comments', auth, postsCtrl.getComments);
router.post('/:id/comments', auth, postsCtrl.createComment);
router.patch('/comments/:id', auth, postsCtrl.updateComment);
router.delete('/comments/:id', auth, postsCtrl.deleteComment); 

module.exports = router;