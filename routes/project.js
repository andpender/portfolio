var express = require('express');
var router = express.Router();

// Require controller modules
var project_controller = require('../controllers/projects');

/* GET random quote genereator. */
router.get('/random-quote-generator', project_controller.random_quote_get);

/* GET wikipedia viewer. */
router.get('/wikipedia-viewer', project_controller.wikipedia_viewer_get);

module.exports = router;
