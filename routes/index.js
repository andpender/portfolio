var express = require('express');
var router = express.Router();

// Require controller modules
var home = require('../controllers/home');

/* GET home page. */
router.get('/', home.index);

/* GET coin home page. */
router.get('/coin', home.coins);

/* GET database page. */
router.get('/add', home.query_get);

/* POST database page. */
router.post('/add', home.query_post);

module.exports = router;
