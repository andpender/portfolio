const models = require('../models');
const Posted = models.posts;

// Display the home index
exports.index = function(req, res, next) {
	res.render('index',{title:"Andrew's Portfolio Site"});
	// Posted.findAll({

	// }).then(rows => {
	// 	res.render('index',{title:"Customers",data:rows,user:req.user});
	// }).catch(err => {
	// 	console.log(err);
	// })
};  

// Test home page
exports.coins = function(req, res, next) {
    res.render('coin', { title: 'New Title', user:req.user});
};