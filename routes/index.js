var express = require('express');
var router = express.Router();
var passport = require('passport');

// Require controller modules
var home = require('../controllers/home');
var authController = require('../controllers/authcontroller');

/* Checks whether the session is logged in*/
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/signin');

}

/* GET home page. */
router.get('/', home.index);

/* GET coin home page. */
router.get('/coin', home.coins);

/* GET signup page. */
router.get('/signup', authController.signup);

/* Post signup page. */
router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
}));

/* GET signin page. */
router.get('/signin', authController.signin);

/* Post signin page. */
router.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
}));

/* GET dashboard page. */
router.get('/dashboard', isLoggedIn, authController.dashboard);

/* GET logout page. */
router.get('/logout', authController.logout);



module.exports = router;