//SuspendedTickets.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var SuspendedTickets = exports.SuspendedTickets = function (options) {
  this.jsonAPIName = 'suspended_tickets';
  this.jsonAPIName2 = 'suspended_ticket';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(SuspendedTickets, Client);

// ######################################################## SuspendedTickets
// ====================================== Listing SuspendedTickets
SuspendedTickets.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['suspended_tickets'], cb);//all
};


// ====================================== Viewing SuspendedTickets

SuspendedTickets.prototype.show = function (options, suspendedTicketID, cb) {
  this.request(options, 'GET', ['suspended_tickets', suspendedTicketID], cb);
};

// ====================================== Recover SuspendedTickets
SuspendedTickets.prototype.recover = function (options, suspendedTicketID, cb) {
  this.request(options, 'PUT', ['suspended_tickets', suspendedTicketID, 'recover'], cb);
};

SuspendedTickets.prototype.recoverMany = function (options, suspendedTicketIDs, cb) {
  this.request(options, 'PUT', ['suspended_tickets', 'recover_many', { ids: suspendedTicketIDs}], cb);
};


// ====================================== Deleting SuspendedTickets
SuspendedTickets.prototype.delete = function (options, suspendedTicketID, cb) {
  this.request(options, 'DEL', ['suspended_tickets', suspendedTicketID],  cb);
};
SuspendedTickets.prototype.destroyMany = function (options, suspendedTicketIDs, cb) {
  this.request(options, 'DEL', ['suspended_tickets', 'destroy_many', { ids: suspendedTicketIDs}], cb);
};
SuspendedTickets.prototype.deleteMany = function (options, suspendedTicketIDs, cb) {
  this.request(options, 'DEL', ['suspended_tickets', 'destroy_many', { ids: suspendedTicketIDs}], cb);
};
