var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connection  = require('express-myconnection');
var mysql = require('mysql');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var env = require('dotenv').load();

// Routes
var index = require('./routes/index');
var project = require('./routes/project');
var blog = require('./routes/blog');
var api = require('./routes/api');
var config = require('./config/config');
var models = require('./models');


var app = express();

// read cookies (needed for auth)
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// configure mysql database
// app.use(
//     connection(mysql,{
//         host: config.database.host,
//         user: config.database.user,
//         password : config.database.password
//     },'pool') //or single
// );

// configure sessions
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Route paths
app.use('/', index);
app.use('/project', project);
app.use('/blog', blog);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Sync Database
models.sequelize.sync().then(function() {


    console.log('Nice! Database looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});


module.exports = app;