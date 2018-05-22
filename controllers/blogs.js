const slug = require('slug');
const models = require('../models');
const Posted = models.posts;

// Display the home index
exports.blog_home_get = function(req, res) {
    Posted.findAll({
        limit: 10
    }).then(rows => {
        res.render('blog_home',{title:"Recent Blog Posts", data:rows, user:req.user});
    })
    // var sql = 'SELECT * FROM blog.posts LIMIT 50';
    // var sess = req.session;
    // req.session.userId = 1;
    //
	// req.getConnection(function(err,connection){
	// 	var query = connection.query(sql,function(err,rows)
	// 	{
	// 	    console.log(req.user);
	// 		res.render('blog_home',{title:"Recent Blog Posts", data:rows, user:req.user});
	// 	});
     // });
};

// Display individual blog page
exports.blog_page_get = function(req, res) {

    Posted.find({
        where: {
            slug: req.params.slug
        }
    }).then(rows => {
        res.render('blog_page',{title:"Blog Posts",data:rows.dataValues, user:req.user});
    }).catch(err => {
        res.render('blog_page',{title:"Blog Posts",error:"Error Not Found"})
    })

    // models.sequelize.query('SELECT * FROM blog.posts WHERE slug="' + req.params.slug + '"')
    //     .then(rows => {
    //         console.log(rows);
    //         res.render('blog_page',{title:"Blog Posts",data:rows[0], user:req.user});
    //     })

    // var sql = 'SELECT * FROM blog.posts WHERE slug="' + req.params.slug + '"';
	// req.getConnection(function(err,connection){
	// 	var query = connection.query(sql,function(err,rows)
	// 	{
     //        if(err)
     //        {
     //            res.render('blog_page',{title:"Blog Posts",error:"Error Not Found"})
     //        }else{
     //        res.render('blog_page',{title:"Blog Posts",data:rows, user:req.user});
     //        }
	// 	});
     // });
};  

// GET blog create page
exports.blog_page_create = function(req, res) {
    res.render('blog_create',{title:"Create Blog Post", user:req.user});
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
        path: trimmedPath,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    var insert_sql = "INSERT INTO blog.posts SET ?";
    if (!blog.slug) {
        insert_sql = '';
    }

    Posted.create({
        title: req.body.title,
        author: req.body.author,
        information: req.body.content,
        slug: slug(req.body.title, {lower: true}),
        path: trimmedPath,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(rows => {
        res.redirect('/blog')
    }).catch(err => {
        console.log(err);
        res.render('blog_create',
                {
                    title: req.body.title,
                    author: req.body.author,
                    information: req.body.content,
                });
    });

    // req.getConnection(function(err,connection){
    //     var query = connection.query(insert_sql, blog, function(err, result){
    //         if(err || !blog.slug)
    //         {
    //             res.render('blog_create',
    //             {
    //                 title: req.body.title,
    //                 author: req.body.author,
    //                 information: req.body.content
    //             });
    //         }else{
    //             console.log(blog);
    //             res.redirect('/blog')
    //         }
    //     });
    // });

};

// GET blog edit page
exports.blog_page_edit_get = function(req, res, next) {
    Posted.find({
        where: {
            slug: req.params.slug
        }
    }).then(rows => {
        res.render('blog_edit',{title:"Blog Posts",data:rows.dataValues, user:req.user});
    }).catch(err => {
        res.render('blog_page',{title:"Blog Posts",error:"Error Not Found"})
    })
    //
    // var sql = 'SELECT * FROM blog.posts WHERE slug = "' + req.params.slug + '"';
    //
	// req.getConnection(function(err,connection){
	// 	var query = connection.query(sql,function(err,rows){
     //        if(err){ return next(err); }
    //
     //        else {
     //            res.render('blog_edit', {title: "Recent Blog Posts", data: rows, user:req.user});
     //        }
	// 	});
     // });

}

// POST blog edit page
exports.blog_page_edit_post = function(req, res, next) {

    var sql = 'UPDATE blog.posts SET \
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

    var sql = 'DELETE FROM blog.posts \
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
