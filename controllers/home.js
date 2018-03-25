// Display the home index
exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
};  

// Test home page
exports.coins = function(req, res, next) {
    res.render('coin', { title: 'New Title' });
};  