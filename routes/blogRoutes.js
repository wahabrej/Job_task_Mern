const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, deleteBlogController, getBlogByIdController, userBlogController } = require('../controllers/blogController');

const router =express.Router();

router.get('/all-blog',getAllBlogsController);

router.post('/create-blog',createBlogController);

router.put('/update-blog/:id',updateBlogController);

router.delete('/delete-blog/:id',deleteBlogController);

router.get('/get-blog/:id',getBlogByIdController);
router.get('/user-blog/:id',userBlogController);
module.exports = router;