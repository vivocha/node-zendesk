//users.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Users = exports.Users = function (options) {
  this.jsonAPIName = 'users';
  this.jsonAPIName2 = 'user';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Users, Client);


Users.prototype.auth = function (options, cb) {
  this.request(options, 'GET', ['users', 'me'], cb);
};


Users.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['users'], cb);
};


Users.prototype.listByGroup = function (options, id, cb) {
  this.requestAll(options, 'GET', ['groups', id, 'users'], cb);
};


Users.prototype.listByOrganization = function (options, id, cb) {
  this.requestAll(options, 'GET', ['organizations', id, 'users'], cb);
};


Users.prototype.show = function (options, id, cb) {
  this.request(options, 'GET', ['users', id], cb);
};


Users.prototype.create = function (options, user, cb) {
  this.request(options, 'POST', ['users'], user, cb);
};


Users.prototype.createMany = function (options, users, cb) {
  this.request(options, 'POST', ['users', 'create_many'], users, cb);
};


Users.prototype.update = function (options, id, user, cb) {
  this.request(options, 'PUT', ['users', id], user, cb);
};


Users.prototype.suspend = function (options, id, cb) {
  this.request(options, 'PUT', ['users'], {"user": {"suspended": true} }, cb);
};


Users.prototype.delete = function (options, id, cb) {
  this.request(options, 'DEL', ['users', id], cb);
};

Users.prototype.search = function (options, params, cb) {
  this.requestAll(options, 'GET', ['users', 'search', params], cb);
};

Users.prototype.me = function (options, cb) {
  this.request(options, 'GET', ['users', 'me'], cb);
};