/**
 * Created by Bandula Gamage on 12/05/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    /**
     * Common attributes
     */
    username:               String,         // Unique user name
    displayname:            String,         // Display name
    email:                  String,         // Email
    enrolled_date:          String          // Enrolled date
});

module.exports = mongoose.model('User', userSchema);