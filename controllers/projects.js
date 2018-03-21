// Display the random quote project
exports.random_quote_get = function(req, res, next) {
    res.render('random_quote', { title: 'Random Quote Generator' });
};  