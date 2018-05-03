var slug = require('slug');

// Display the home index
exports.blog_home_get = function(req, res) {
    var sql = 'SELECT * FROM blog.post LIMIT 50';
	req.getConnection(function(err,connection){
		var query = connection.query(sql,function(err,rows)
		{ 
			res.render('blog_home',{title:"Recent Blog Posts",data:rows});
		});
     });
};

// Display individual blog page
exports.blog_page_get = function(req, res) {
    var sql = 'SELECT * FROM blog.post WHERE slug="' + req.params.slug + '"';
	req.getConnection(function(err,connection){
		var query = connection.query(sql,function(err,rows)
		{ 
            if(err)
            {
                res.render('blog_page',{title:"Blog Posts",error:"Error Not Found"})
            }else{
            res.render('blog_page',{title:"Blog Posts",data:rows});
            }
		});
     });
};  

// GET blog create page
exports.blog_page_create = function(req, res) {
    res.render('blog_create',{title:"Create Blog Post"});
};

// POST blog create page
exports.blog_page_post = function(req, res) {
    if (!req.file) {
        var trimmedPath = '';
    } else {
        var trimmedPath = req.file.path.replace("public/uploads", "/uploads");
    }

    var blog = {
        title: req.body.title,
        author: req.body.author,
        information: req.body.content,
        slug: slug(req.body.title, {lower: true}),
        path: trimmedPath
    }

    var insert_sql = "INSERT INTO blog.post SET ?";
    if (!blog.slug) {
        insert_sql = '';
    }

    req.getConnection(function(err,connection){
        var query = connection.query(insert_sql, blog, function(err, result){
            if(err || !blog.slug)
            {
                res.render('blog_create', 
                { 
                    title: req.body.title,
                    author: req.body.author,
                    information: req.body.content
                });
            }else{
                console.log(blog);
                res.redirect('/blog')
            }		
        });
    });

};

// GET blog edit page
exports.blog_page_edit_get = function(req, res, next) {

    var sql = 'SELECT * FROM blog.post WHERE slug = "' + req.params.slug + '"';

	req.getConnection(function(err,connection){
		var query = connection.query(sql,function(err,rows){
            if(err){ return next(err); }

            else {
                res.render('blog_edit', {title: "Recent Blog Posts", data: rows});
            }
		});
     });    
}

// POST blog edit page
exports.blog_page_edit_post = function(req, res, next) {

    var sql = 'UPDATE blog.post SET \
                author = "' + req.body.author + '", \
                title = "' + req.body.title + '", \
                information = "' + req.body.content + '", \
                slug = "' + slug(req.body.title, {lower: true}) + '" \
                WHERE slug = "' + req.params.slug + '"';
    req.getConnection(function(err,connection){
        var query = connection.query(sql, function(err, result){
            if(err){ return next(err); }

            else{
                res.redirect('/blog')
            }		
        });
    });
}

// GET blog delete page
exports.blog_page_delete_get = function(req, res, next) {

    var sql = 'DELETE FROM blog.post \
                WHERE slug = "' + req.params.slug + '"';
    req.getConnection(function(err,connection){
        var query = connection.query(sql, function(err, result){
            if(err){ return next(err); }

            else{
                res.redirect('/blog')
            }		
        });
    });
}