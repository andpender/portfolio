// Display the home index
exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
};  