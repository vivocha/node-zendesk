//GroupMemberships.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroup_memberships = require('./helpers').defaultgroup_memberships;


var GroupMemberships = exports.GroupMemberships = function (options) {
  this.jsonAPIName  = 'group_memberships';
  this.jsonAPIName2 = 'group_membership';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(GroupMemberships, Client);

// ######################################################## GroupMemberships
// ====================================== Listing GroupMemberships
GroupMemberships.prototype.list = function (options,  cb) {
  this.requestAll(options, 'GET', ['group_memberships'], cb);//all
};

GroupMemberships.prototype.listByUser = function (options,  userID, cb) {
  this.requestAll(options, 'GET', ['users', userID, 'group_memberships'], cb);//all
};

GroupMemberships.prototype.listByGroup = function (options,  groupID, cb) {
  this.requestAll(options, 'GET', ['groups', groupID, 'group_memberships'], cb);//all
};



// ====================================== Viewing GroupMemberships

GroupMemberships.prototype.show = function (options,  groupMembershipID, cb) {
  this.request(options, 'GET', ['group_memberships', groupMembershipID], cb);
};

GroupMemberships.prototype.showByUser = function (options,  userID, groupMembershipID, cb) {
  this.request(options, 'GET', ['users', userID, 'group_memberships', groupMembershipID], cb);
};

// ====================================== Creating GroupMemberships
GroupMemberships.prototype.create = function (options,  groupMembership, cb) {
  this.request(options, 'POST', ['group_memberships'], groupMembership, cb);
};

GroupMemberships.prototype.createByUser = function (options,  userID, groupMembership, cb) {
  this.request(options, 'POST', ['users', userID, 'group_memberships'], groupMembership, cb);
};


// ====================================== Deleting GroupMemberships
GroupMemberships.prototype.delete = function (options,  groupMembershipID, cb) {
  this.request(options, 'DEL', ['group_memberships', groupMembershipID],  cb);
};

GroupMemberships.prototype.deleteByUser = function (options,  userID, groupMembershipID, cb) {
  this.request(options, 'DEL', ['users', userID, 'group_memberships', groupMembershipID],  cb);
};

// ====================================== Set membership as default
GroupMemberships.prototype.makeDefault = function (options,  userID, groupMembershipID, cb) {
  this.request(options, 'PUT', ['users', userID, 'group_memberships', groupMembershipID, 'make_default'], cb);
};