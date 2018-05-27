let passport = require('passport');


// Displays signup page
exports.signup = function (req, res) {
    res.render('signup', {user: req.user});
};

// Displays signin page
exports.signin = function (req, res) {
    res.render('signin', {user: req.user});
};

// Displays dashboard page
exports.dashboard = function (req, res) {
    res.render('dashboard', {user: req.user});

};

// Displays logout page
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
};
