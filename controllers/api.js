const dns = require('dns');
const models = require('../models');
const Shortened = models.short;

// Display the apis
exports.timestamp = function(req, res, next) {

    var y = Date.parse(req.params['date_string']);

    if (isNaN(y)){
      // unix timecode passed in
      if(typeof req.params['date_string'] == 'undefined'){
        let k = new Date();
        res.send({ unix: Date.now(), utc: k.toUTCString()});
      } else {
        let utcD = new Date(parseInt(req.params['date_string']));
        console.log(utcD);
        if (utcD == "Invalid Date"){
            res.send({ error: "Invalid Date"});    
        } else {
            res.send({ unix: parseInt(req.params['date_string']), utc: utcD.toUTCString()});
        }
      }
    } else {
      // utc timecode passed in
      let utcD = new Date(req.params['date_string']);
      if (y == "Invalid Date"){
        res.send({ error: y});    
      } else {
        res.send({ unix: utcD.getTime(), utc: utcD.toUTCString()});
      }
    }
};  


// Displays user details from request header
exports.whoami = function(req, res, next) {
    let host = req.headers.host;
    let language = req.headers["accept-language"];
    let agent = req.headers["user-agent"]; 
    res.send({ "ipaddress": host, "language": language, "software": agent});   
};


// Take shortened url and redirect to URL from database
exports.short_get = function(req, res, next) {
    Shortened.find({
        where: {
            id: req.params.short
        }
    }).then(rows => {
        console.log(rows.dataValues.url);
        res.redirect("https://" + rows.dataValues.url);   
    }).catch(err => {
        console.log(err);
        res.render('error', {error: err});   
    })
}; 


// Take posted URL and return shortened in JSON
exports.short_post = function(req, res, next) {
    let url = req.body.url.replace(/^https*:\/*\/*/i, '');
    console.log(url);
    dns.lookup(url, (err, address, family) => {
        if (err) {
            res.send({"error": "invalid URL"});
        } else {
            Shortened.create({
                url: url,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then(rows => {
                res.send({'original_url':req.body.url, 'short_url':rows.dataValues.id});
            }).catch(err => {
                console.log(err);
                res.render('short');
            });
        }
    });    
};