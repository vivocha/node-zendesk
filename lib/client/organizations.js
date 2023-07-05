//Organizations.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Organizations = exports.Organizations = function (options) {
  this.jsonAPIName = 'organizations';
  this.jsonAPIName2 = 'organization';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Organizations, Client);

// ######################################################## Organizations
// ====================================== Listing Organizations
Organizations.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['organizations'], cb);//all
};


// ====================================== Viewing Organizations

Organizations.prototype.show = function (options, organizationID, cb) {
  this.request(options, 'GET', ['organizations', organizationID], cb);
};

// ====================================== Creating Organizations
Organizations.prototype.create = function (options, organization, cb) {
  this.request(options, 'POST', ['organizations'], organization, cb);
};

// ====================================== Updating Organizations

Organizations.prototype.update = function (options, organizationID, organization, cb) {
  this.request(options, 'PUT', ['organizations', organizationID], organization, cb);
};


// ====================================== Deleting Organizations
Organizations.prototype.delete = function (options, organizationID, cb) {
  this.request(options, 'DEL', ['organizations', organizationID],  cb);
};