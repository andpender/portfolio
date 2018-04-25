var express = require('express');
var router = express.Router();

// Require controller modules
var home = require('../controllers/home');

/* GET home page. */
router.get('/', home.index);

/* GET coin home page. */
router.get('/coin', home.coins);

module.exports = router;