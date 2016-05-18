
var expect = require('expect');
var sinon = require('sinon');
var mockery = require('mockery');

describe("User service", function () {

  var listOfUsers = {list: [{name:"test 1"},{name:"test 2"}]};
  var errorMessage = "error occurred";

  before(function () {
      mockery.enable({ useCleanCache: true });
      mockery.warnOnUnregistered(false);
  })

  after(function () {
      mockery.disable();
  })

  beforeEach(function () {
    var mongoose = {connect: function(){}};
    var mongoose_spy = sinon.spy(mongoose, "connect");
    mockery.registerAllowable('../../models/documentdb/model/user');
    mockery.registerAllowable('mongoose');
    mockery.registerMock('mongoose', mongoose)
  });

  afterEach(function () {
    mockery.resetCache();
    mockery.deregisterAll();
  });

  describe("listUsers", function () {

    it("On error, the response should render with error", function () {
      var getUsers = function(callback){
        callback(errorMessage, null);
      };
      var User = { find: getUsers };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { };
      var res = { send: function (err) { return err; } };
      var spy = sinon.spy(res, "send");
      var users = userService.listUsers(req, res);
      expect(spy.calledWith(errorMessage)).toBe(true);
    });

    it("User list should return expected list of users", function () {
      var getUsers = function(callback){
        callback(null, listOfUsers);
      };
      var User = { find: getUsers };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.listUsers(req, res);
      expect(spy.calledWith(listOfUsers)).toBe(true);
    });

  });

  describe("getUserDetails", function () {

    it("should get user detail when username is valid", function () {
      var user = {user:'user'}
      var getUser = function({},callback){
        callback(null, user);
      };
      var User = { find: getUser };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { params: {username: 'username'} };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.getUserDetails(req, res);
      expect(spy.calledWith(user)).toBe(true);
    });

    it("should get error when username is not found", function () {
      var getUser = function({},callback){
        callback(errorMessage, null);
      };
      var User = { find: getUser };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { params: {username: 'username'} };
      var res = { send: function (result) { return result; } };
      var spy = sinon.spy(res, "send");
      var users = userService.getUserDetails(req, res);
      expect(spy.calledWith(errorMessage)).toBe(true);
    });

    it("should get throw error when username is not given", function () {
      var getUser = function({},callback){
        callback(errorMessage, null);
      };
      var User = { find: getUser };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = res = { };
      expect(function(){
        userService.getUserDetails(req, res)
      }).toThrow();
    });

  });

  describe("createUser", function () {
    it("should create user when new user data is valid", function () {
      var user = {user:'user'}
      var saveUser = function(callback){
        callback(null);
      };
      var User = function() {};
      User.prototype.save = saveUser;

      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { body: {username: 'tommy', displayname: 'Tom watch', email: 'tom@tom.com', enrolled_date: '11-10-2000'} };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.createUser(req, res);
      expect(spy.calledWith({success: true, message: 'User created'})).toBe(true);
    });

    it("should give error message when new user is not created", function () {
      var user = {user:'user'}
      var saveUser = function(callback){
        callback(errorMessage);
      };
      var User = function() {};
      User.prototype.save = saveUser;

      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { body: {username: 'tommy', displayname: 'Tom watch', email: 'tom@tom.com', enrolled_date: '11-10-2000'} };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.createUser(req, res);
      expect(spy.calledWith({success: false, message: 'User creation failed'})).toBe(true);
    });

    it("should throw error message when new user is not valid", function () {
      var user = {user:'user'}
      var saveUser = function(callback){
        callback(errorMessage);
      };
      var User = function() {};
      User.prototype.save = saveUser;

      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = {  };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      userService.createUser(req, res);
      sinon.assert.notCalled(spy);
    });
  });

  describe("deleteUser", function () {
    it("should delete user detail when username is valid", function () {
      var user = {user:'user'}
      var removeUser = function({},callback){
        callback(null, user);
      };
      var User = { remove: removeUser };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { params: {_id: 123} };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.deleteUser(req, res);
      sinon.assert.calledWith(spy, sinon.match.has("success", true));
    });

    it("should not delete user detail when username is invalid", function () {
      var user = {user:'user'}
      var removeUser = function({},callback){
        callback(errorMessage, null);
      };
      var User = { remove: removeUser };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { params: {_id: 123} };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.deleteUser(req, res);
      sinon.assert.calledWith(spy, sinon.match.has("success", false));
    });

    it("should throw error when id not valid", function () {
      var user = {user:'user'}
      var removeUser = function({},callback){
        callback(errorMessage, null);
      };
      var User = { remove: removeUser };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.deleteUser(req, res);
      sinon.assert.notCalled(spy);
    });
  });

  describe("updateUser", function () {
    it("should update user detail when details are valid", function () {
      var user = {user:'user'}
      var updateUser = function({},{},{},callback){
        callback(null, user);
      };
      var User = { update: updateUser };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { body: {_id: 123} };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.updateUser(req, res);
      sinon.assert.calledWith(spy, sinon.match.has("success", true));
    });

    it("should not update user detail when details are invalid", function () {
      var user = {user:'user'}
      var updateUser = function({},{},{},callback){
        callback(errorMessage, user);
      };
      var User = { update: updateUser };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { body: {_id: 123} };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.updateUser(req, res);
      sinon.assert.calledWith(spy, sinon.match.has("success", false));
    });

    it("should throw error when details are invalid", function () {
      var user = {user:'user'}
      var updateUser = function({},{},{},callback){
        callback(errorMessage, user);
      };
      var User = { update: updateUser };
      mockery.registerMock('../../models/documentdb/model/user', User)
      var userService = require('../../../app/controllers/main/user-service');
      var req = { };
      var res = { json: function (result) { return result; } };
      var spy = sinon.spy(res, "json");
      var users = userService.updateUser(req, res);
      sinon.assert.notCalled(spy);
    });
  });
});
