var express = require('express');
var router = express.Router();

// Require controller modules
var api = require('../controllers/api');

router.get('/timestamp/:date_string?', api.timestamp);

router.get('/shorturl/new', api.short_get);

router.post('/shorturl/new', api.short_post);

router.get('/shorturl/:short', api.short_get);

router.get('/whoami', api.whoami);

module.exports = router;
