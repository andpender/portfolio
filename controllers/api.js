const dns = require('dns');
const models = require('../models');
const Shortened = models.short;
const Exercise_User = models.exercise_user;
const Exercise = models.exercise;
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display the apis
exports.timestamp = function(req, res) {

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
exports.whoami = function(req, res) {
    let host = req.headers.host;
    let language = req.headers["accept-language"];
    let agent = req.headers["user-agent"]; 
    res.send({ "ipaddress": host, "language": language, "software": agent});   
};


// Display shortener submission form
exports.short_form = function(req, res) {
    res.render('short');
}; 

// Take shortened url and redirect to URL from database
exports.short_get = function(req, res) {
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
exports.short_post = function(req, res) {
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


// Get exercise dashboard
exports.exercise = function(req, res, next) {
    res.render('exercise_home');
};


// Post a new user and return an ID
exports.new_user = function(req, res) {
    Exercise_User.create({
        user_id: Math.random().toString(36).substr(2, 10),
        username: req.body.username
    }).then(rows => {
        res.send({'username':rows.username, '_id':rows.user_id});
    }).catch(err => {
        res.render('exercise_home', {'err':err.errors[0].message});
    });
};


// Post a new excercise for a particular user ID
exports.new_exercise = function(req, res) {
    if(Object.prototype.toString.call(req.body.date) !== "[object Date]"){
        req.body.date = new Date();
    }
    Exercise_User.findAll({
        where: {
            user_id: req.body.user_id
        }
    }).then(rows => {
        Exercise.create({
            user_id: rows[0].user_id,
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date
        }).then(rows => {
            res.send({'user_id':rows.user_id, 'description':rows.description, 'duration':rows.duration, 'date':rows.date});
        }).catch(err => {
            res.send({'error':err});
        });
    }).catch(err => {
        res.send({'error':err});
    });
};

// Get a users exercise history
exports.user_history = function(req, res) {
    var log = [];
    if (req.query.userId == null){
        console.log('Not provided');
    } else {
        Exercise.findAll({
            where: {
                user_id: req.query.userId
            }
        }).then(rows => {
            for (let i=0; i<rows.length; i++) {
                log.push({'description': rows[i].dataValues.description,
                          'duration': rows[i].dataValues.duration,
                          'date': rows[i].dataValues.date});
            };
            res.send({'_id': rows[0].user_id, 'count':rows.length, 'log':log});
        }).catch(err => {
            console.log(err);
        });
    }
};