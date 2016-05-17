var expect = require('expect');
var sinon = require('sinon');
var mockery = require('mockery');

describe("User service", function () {

  var userService;
  var listOfUsers = {list: [{name:"test 1"},{name:"test 2"}]};
  var errorMessage = "error";

  beforeEach(function () {
    mockery.enable({ useCleanCache: true });
    mockery.warnOnUnregistered(false);
    var mongoose = {connect: function(){}};
    var mongoose_spy = sinon.spy(mongoose, "connect");
    mockery.registerAllowable('../../models/documentdb/model/user');
    mockery.registerAllowable('mongoose');
    mockery.registerMock('mongoose', mongoose)
  });

  afterEach(function () {
    mockery.disable();
    mockery.resetCache();
    mockery.deregisterAll();
  });


  it("On error, the response should render with error", function () {
    var getUsers = function(callback){
      callback(errorMessage, null);
    };
    var User = { find: getUsers };
    mockery.registerMock('../../models/documentdb/model/user', User)
    userService = require('../../../app/controllers/main/user-service');
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
    userService = require('../../../app/controllers/main/user-service');
    var req = { };
    var res = { json: function (result) { return result; } };
    var spy = sinon.spy(res, "json");
    var users = userService.listUsers(req, res);
    expect(spy.calledWith(listOfUsers)).toBe(true);
  });

});
