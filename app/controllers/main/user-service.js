/**
 * Created by Bandula Gamage on 12/05/2016.
 */

///////////////////////////////////////////////////////////////
// Imports
///////////////////////////////////////////////////////////////
var config    = require('../../config/config');
var User	    = require('../../models/documentdb/model/user');
var mongoose = require('mongoose');

// Format: mongodb://<server_url>:<port>/<database_name>
var mongoDBUrl = 'mongodb://' + config.mongoDBConfig.server + ':' + config.mongoDBConfig.port + '/' + config.mongoDBConfig.database;
mongoose.connect(mongoDBUrl);    // connect to our database


///////////////////////////////////////////////////////////////
// Public Methods
///////////////////////////////////////////////////////////////
module.exports = {

  listUsers: function(req, res) {
    User.find(function(err, users) {
        if (err)
          res.send(err);
        else
          res.json(users);
    })
  },

  getUserDetails: function(req, res) {
      //console.log('<getOutageDetails> ' + req.params.heatmap_type);
      User.find({username: req.params.username}, function(err, user) {
          if (err)
              res.send(err);
          else
              res.json(user);
      })
  },

  createUser: function(req, res) {
      try { // Create the user
          var newUser = new User({
              username:           req.body.username,
              displayname:        req.body.displayname,
              email:              req.body.email,
              enrolled_date:      req.body.enrolled_date
          });

          newUser.save(function (err) {
              if (err) {
                  res.json({success: false, message: 'User creation failed'});
              } else {
                  console.log('User saved successfully');
                  res.json({success: true, message: 'User created'});
              }
          });
      } catch (e) {
          console.log('<userService.createUser> ' + JSON.stringify(e));
      }
  },

  deleteUser: function(req, resr) {
      // There are several approaches
      // 1. User.find({ username:req.params.username }).remove( callback );
      // 2. User.find({ username:req.params.username }).remove().exec();
      // 3. User.remove({ username:req.params.username }, callback );
      // 4. User.findOneAndRemove({ username:req.params.username }, callback );
      try {
          User.remove({_id: req.params._id}, function (err, user) {
              if (err)
                  res.json({success: false, message: 'User delete failed'});
              else
                  res.json({success: true, message: 'User deleted'});
          });
      } catch (e) {
          console.log('<userService.deleteUser> ' + JSON.stringify(e));
      }
  },

  updateUser: function(req, res) {
      //console.log(JSON.stringify(req.body));
      try {
          User.update({_id: req.body._id}, req.body, {upsert: true}, function (err, user) {
              if (err)
                  res.json({success: false, message: 'User update failed'});
              else
                  res.json({success: true, message: 'User updated'});
          });
      } catch (e) {
          console.log('<userService.updateUser> ' + JSON.stringify(e));
      }
  }

};
