// Display the random quote project
exports.random_quote_get = function(req, res, next) {
    res.render('random_quote', { title: 'Random Quote Generator', user:req.user});
};  

// Display the wikipedia project
exports.wikipedia_viewer_get = function(req, res, next) {
    res.render('wikipedia_viewer', { title: 'Wikipedia Viewer', user:req.user});
};  