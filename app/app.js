///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var busboyBodyParser= require('busboy-body-parser');
var morgan          = require('morgan');
var fs              = require('fs');
var util            = require('util');

var config          = require('./config/config');
var routes          = require('./routes/index');

///////////////////////////////////////////////////////////////
// Generate Application
///////////////////////////////////////////////////////////////
var app = express();

/**
 * Redirects the output to a debug file
 */
var log_file        = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout      = process.stdout;

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Set favourite icon
 */
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
//app.use(morgan('dev')); // log requests to the console

/**
 * Body parsers
 */
app.use(busboyBodyParser());                        // Body parser for multi part documents
app.use(bodyParser.json());                         // Body parser for JSON messages

/**
 * The extended option allows to choose between parsing the URL-encoded data with the querystring
 * library (when false) or the qs library (when true). The "extended" syntax allows for rich objects
 * and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
 *
 * Default is true and had been deprecated.
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(formidable.parse());        // Parses upload form data

/**
 * Bootstrap routes
 */
require('./routes/index')(app);

module.exports = app;
