var express = require('express');
var router = express.Router();

// Multer saves files with diskStorage defining its name and where
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });


// Require controller modules
var blog_controller = require('../controllers/blogs');

/* GET blog home page */
router.get('/', blog_controller.blog_home_get);

/* GET blog create page */
router.get('/create', blog_controller.blog_page_create);

/* POST blog create page */
router.post('/create', upload.single('photo'), blog_controller.blog_page_post);

/* GET blog edit page */
router.post('/edit/:slug', blog_controller.blog_page_edit_post);

/* POST blog edit page */
router.get('/delete/:slug', blog_controller.blog_page_delete_get);

/* GET blog edit page */
router.get('/edit/:slug', blog_controller.blog_page_edit_get);

/* GET individual blog page */
router.get('/:slug', blog_controller.blog_page_get);


module.exports = router;