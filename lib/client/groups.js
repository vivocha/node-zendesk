//Groups.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Groups = exports.Groups = function (options) {
  this.jsonAPIName = 'groups';
  this.jsonAPIName2 = 'group';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Groups, Client);

// ######################################################## Groups
// ====================================== Listing Groups
Groups.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['groups'], cb);//all
};


// ====================================== Viewing Groups
Groups.prototype.assignable = function (options, cb) {
  this.request(options, 'GET', ['groups', 'assignable'], cb);//all
};

Groups.prototype.show = function (options, groupID, cb) {
  this.request(options, 'GET', ['groups', groupID], cb);
};

// ====================================== Creating Groups
Groups.prototype.create = function (options, group, cb) {
  this.request(options, 'POST', ['groups'], group, cb);
};

// ====================================== Updating Groups

Groups.prototype.update = function (options, groupID, group, cb) {
  this.request(options, 'PUT', ['groups', groupID], group, cb);
};


// ====================================== Deleting Groups
Groups.prototype.delete = function (options, groupID, cb) {
  this.request(options, 'DEL', ['groups', groupID],  cb);
};
