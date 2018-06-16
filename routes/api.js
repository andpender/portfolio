var express = require('express');
var router = express.Router();

// Require controller modules
var api = require('../controllers/api');

router.get('/timestamp/:date_string', api.timestamp);

module.exports = router;
