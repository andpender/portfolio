// Display the home index
exports.index = function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM pets.cats',function(err,rows)
		{ 
			res.render('index',{title:"Customers",data:rows});
		});
     });
};  

// Test home page
exports.coins = function(req, res, next) {
    res.render('coin', { title: 'New Title' });
};