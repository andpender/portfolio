var express = require('express');
var router = express.Router();

// Require controller modules
var home = require('../controllers/home');

/* GET home page. */
router.get('/', home.index);

module.exports = router;
