//Forums.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Forums = exports.Forums = function (options) {
  this.jsonAPIName = 'forums';
  this.jsonAPIName2 = 'forum';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Forums, Client);

// ######################################################## Forums
// ====================================== Listing Forums
Forums.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['forums'], cb);//all
};

Forums.prototype.listByCategory = function (options, categoryID, cb) {
  this.requestAll(options, 'GET', ['categories', categoryID, 'forums'], cb);//all
};


// ====================================== Viewing Forums

Forums.prototype.show = function (options, forumID, cb) {
  this.request(options, 'GET', ['forums', forumID], cb);
};

// ====================================== Creating Forums
Forums.prototype.create = function (options, forum, cb) {
  this.request(options, 'POST', ['forums'], forum, cb);
};

// ====================================== Updating Forums

Forums.prototype.update = function (options, forumID, forum, cb) {
  this.request(options, 'PUT', ['forums', forumID], forum, cb);
};


// ====================================== Deleting Forums
Forums.prototype.delete = function (options, forumID, cb) {
  this.request(options, 'DEL', ['forums', forumID],  cb);
};