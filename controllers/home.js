// Display the home index
exports.index = function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM blog.posts',function(err,rows)
		{
			// console.log(req.posts);
			res.render('index',{title:"Customers",data:rows,user:req.user});
		});
     });
};  

// Test home page
exports.coins = function(req, res, next) {
    res.render('coin', { title: 'New Title', user:req.user});
};