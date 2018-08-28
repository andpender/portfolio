const slug = require('slug');
const models = require('../models');
const Posted = models.posts;

// Display the home index
exports.blog_home_get = function(req, res) {
    Posted.findAll({
        limit: 10
    }).then(rows => {
        res.render('blog_home',{title:"Recent Blog Posts", data:rows, user:req.user});
    }).catch(err => {
        res.render('blog_home',{title:"Recent Blog Posts", data:"", user:""});
    })
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
};

// GET blog edit page
exports.blog_page_edit_get = function(req, res) {
    Posted.find({
        where: {
            slug: req.params.slug
        }
    }).then(rows => {
        console.log(rows);
        res.render('blog_edit',{title:"Blog Posts",data:rows.dataValues, user:req.user});
    }).catch(err => {
        res.render('blog_page',{title:"Blog Posts",error:"Error Not Found"})
    })
};

// POST blog edit page
exports.blog_page_edit_post = function(req, res) {
    Posted.update({
        title: req.body.title,
        author: req.body.author,
        information: req.body.content,
        slug: slug(req.body.title, {lower: true})
    },
        {where: {slug: req.params.slug}}
    ).then(rowsUpdated => {
        console.log(rowsUpdated);
        res.redirect('/blog');
    }).catch(err => {
        console.log(err);
    })
};

// GET blog delete page
exports.blog_page_delete_get = function(req, res) {
    Posted.destroy({
        where: {
            slug: req.params.slug
        }
    }).then(rowDeleted => {
        console.log(rowDeleted);
        res.redirect('/blog');
    }).catch(err => {
        console.log(err);
    })

};
