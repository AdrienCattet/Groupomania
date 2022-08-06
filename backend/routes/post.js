const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.js');
const authAndAdmin = require('../middleware/auth&admin.js');
const multer = require('../middleware/multer-config.js');

const postsCtrl = require('../controllers/post.js');

router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:postId', authAndAdmin, postsCtrl.getOnePost);
router.post('/', auth, multer, postsCtrl.createPost);
router.put('/:postId', authAndAdmin, multer, postsCtrl.modifyPost);
router.delete('/:postId', authAndAdmin, postsCtrl.deletePost);
router.post('/:postId/like', auth, postsCtrl.ratePost);

module.exports = router;