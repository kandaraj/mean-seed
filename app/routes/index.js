///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
var constants   = require('../shared/constants');
var authService = require('../controllers/auth/auth-service');
var userService = require('../controllers/main/user-service');
var dataService = require('../controllers/main/data-service');

var showWelcomeMessage = function(req, res) {
    res.json({ message: 'Welcome to sample service' });
};

///////////////////////////////////////////////////////////////
// 	Expose Methods
///////////////////////////////////////////////////////////////
module.exports = function (app) {

// -------------------------------------------------------------------------------
// Public routes
// -------------------------------------------------------------------------------
//  1. GET      /api/                   - Display greeting message
//  2. GET      /login/                 - User login service
//  3. POST     /login/                 - User login service

// -------------------------------------------------------------------------------
// Authenticated routes
// -------------------------------------------------------------------------------
//  User Maintenance
// -------------------------------------------------------------------------------
//  1.  GET      /api/users              - Returns all user details
//  2.  POST     /api/users              - Create a new user
//  3.  GET      /api/users/check        - Returns the currently logged in user details
//  4.  GET      /api/users/:username    - Returns the selected user details
//  5.  PUT      /api/users/:username    - Updates the selected user
//  6.  DELETE   /api/users/:username    - Deletes the selected user
// -------------------------------------------------------------------------------
//  Health Record Maintenance
// -------------------------------------------------------------------------------
//  1.  GET      /api/data/records       - Returns the available records
//  2.  POST     /api/data/records       - Create a new record
//  3.  GET      /api/data/records/:userid - Returns records for the user
//  4.  PUT      /api/data/records/:userid - Updates the record for the user
//  5.  DELETE   /api/data/records/:userid - Deletes the record for the user
// -------------------------------------------------------------------------------

    // Base API welcome message
    app.get('/api', showWelcomeMessage);

    // Auth Service Implementations
    app.post('/login',              authService.handlePostAuthRequest);
    app.get('/login',               authService.handleGetAuthRequest);

    // User service Implementations
    app.get('/api/users',           userService.listUsers);
    app.post('/api/users',          userService.createUser);
    app.get('/api/users/:username', userService.getUserDetails);
    app.put('/api/users/:_id',      userService.updateUser);
    app.delete('/api/users/:_id',   userService.deleteUser);

    // Data Service Implementations
    app.get('/api/data/records/:user',dataService.listRecords);
    app.post('/api/data/records',   dataService.saveRecord);


};

