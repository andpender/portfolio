// Display the home index
exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
};  

// Display the home index
exports.lily_get = function(req, res, next) {
    res.render('lily', { title: 'MY NAME IS LILY' });
};  