//tickets.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Tickets = exports.Tickets = function (options) {
  this.jsonAPIName = 'tickets';
  this.jsonAPIName2 = 'ticket';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Tickets, Client);

// ######################################################## Tickets
// ====================================== Listing Tickets
Tickets.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['tickets'], cb);//all
};

Tickets.prototype.listByOrganization = function (options, orgID, cb) {
  this.requestAll(options, 'GET', ['organizations', orgID, 'tickets'], cb);//all
};

Tickets.prototype.listByUserRequested = function (options, userID, cb) {
  this.requestAll(options, 'GET', ['users', userID, 'tickets', 'requested'], cb);//all
};

Tickets.prototype.listByUserCCD = function (options, userID, cb) {
  this.requestAll(options, 'GET', ['users', userID, 'tickets', 'ccd'], cb);//all
};

Tickets.prototype.listRecent = function (options, cb) {
  this.requestAll(options, 'GET', ['tickets', 'recent'], cb);//all?
};

Tickets.prototype.listCollaborators = function (options, ticketID, cb) {
  this.requestAll(options, 'GET', ['tickets', ticketID, 'collaborators'],  cb);//all?
};

Tickets.prototype.listIncidents = function (options, ticketID, cb) {
  this.requestAll(options, 'GET', ['tickets', ticketID, 'incidents'],  cb);//all
};

// ====================================== Viewing Tickets
Tickets.prototype.show = function (options, ticketID, cb) {
  this.request(options, 'GET', ['tickets', ticketID], cb);
};

// ====================================== Creating Tickets
Tickets.prototype.create = function (options, ticket, cb) {
  this.request(options, 'POST', ['tickets'], ticket,  cb);
};

// ====================================== Updating Tickets
Tickets.prototype.update = function (options, ticketID, ticket, cb) {
  this.request(options, 'PUT', ['tickets', ticketID], ticket,  cb);
};

Tickets.prototype.updateMany = function (options, ticket_ids, ticket, cb) {
  this.request(options, 'PUT', ['tickets', 'update_many', {ids: ticket_ids}], ticket,  cb);
};

// ====================================== Deleting Tickets
Tickets.prototype.delete = function (options, ticketID, cb) {
  this.request(options, 'DEL', ['tickets', ticketID],  cb);
};

// ######################################################## Ticket export (max 1000 tickets per request in 5 min intrvals)
// ====================================== Ticket Export
Tickets.prototype.export = function (options, startTime, cb) {
  this.request(options, 'GET', ['exports', 'tickets', {start_time: startTime}],  cb);
};

// ====================================== Ticket Export Sample (max 50 tickets per request)
Tickets.prototype.exportSample = function (options, startTime, cb) {
  this.request(options, 'GET', ['exports', 'tickets', 'sample', {start_time: startTime}],  cb);
};

// ######################################################## Ticket Audits

// ====================================== Listing Audits
Tickets.prototype.exportAudit = function (options, ticketID, cb) {
  this.request(options, 'GET', ['tickets', ticketID, 'audits'],  cb);
};

