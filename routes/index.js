var express = require('express');
var router = express.Router();
var passport = require('passport');

// Require controller modules
var home = require('../controllers/home');
var authController = require('../controllers/authcontroller');


/* GET home page. */
router.get('/', home.index);

/* GET coin home page. */
router.get('/coin', home.coins);

module.exports = router;