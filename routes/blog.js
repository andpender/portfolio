var express = require('express');
var router = express.Router();

// Require controller modules
var blog_controller = require('../controllers/blogs');

/* GET blog home page */
router.get('/', blog_controller.blog_home_get);

/* GET blog create page */
router.get('/create', blog_controller.blog_page_create);

/* POST blog create page */
router.post('/create', blog_controller.blog_page_post);

/* POST blog edit page */
router.post('/edit/:slug', blog_controller.blog_page_edit_post);

/* POST blog edit page */
router.get('/delete/:slug', blog_controller.blog_page_delete_get);

/* GET blog edit page */
router.get('/edit/:slug', blog_controller.blog_page_edit_get);

/* GET individual blog page */
router.get('/:slug', blog_controller.blog_page_get);


module.exports = router;