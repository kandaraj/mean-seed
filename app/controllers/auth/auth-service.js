/**
 * Created by Bandula Gamage on 12/05/2016.
 */

///////////////////////////////////////////////////////////////
// Imports
///////////////////////////////////////////////////////////////
var jwt         = require('json-web-token');

var constants   = require('../../shared/constants');
var config      = require('../../config/config');
var mongoose    = require('mongoose');
var User	    = require('../../models/documentdb/model/user');

// Format: mongodb://<server_url>:<port>/<database_name>
var mongoDBUrl = 'mongodb://' + config.mongoDBConfig.server + ':' + config.mongoDBConfig.port + '/' + config.mongoDBConfig.database;
mongoose.createConnection(mongoDBUrl);    // connect to our database

///////////////////////////////////////////////////////////////
// Public Methods
///////////////////////////////////////////////////////////////
module.exports = {
    handleGetAuthRequest: function (req, res) {
        console.log(JSON.stringify(req.body));
    },

    handlePostAuthRequest: function (req, res) {
        console.log(JSON.stringify(req.body));
    }
};
