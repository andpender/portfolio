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

// Post
exports.query_post = function(req, res, next) {
		var customer = {
			name: req.body.name,
			owner: req.body.owner,
			birth: req.body.birth
        }
        
		var insert_sql = "INSERT INTO cats SET ?";
		req.getConnection(function(err,connection){
			var query = connection.query(insert_sql, customer, function(err, result){
				if(err)
				{
					res.render('add', 
					{ 
						name: req.body.name, 
						owner: req.body.owner,
						birth: '2018-02-02',
					});
				}else{
                    console.log(customer);
                    res.redirect('/')
				}		
			});
		});

};

exports.query_get = function(req, res, next) {
	res.render(	'add', 
	{ 
		title: 'Add New Customer',
		name: '',
		owner: '',
		birth:''
    });
};    