//ticketfields.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var TicketFields = exports.TicketFields = function (options) {
  this.jsonAPIName = 'ticket_fields';
  this.jsonAPIName2 = 'ticket_field';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketFields, Client);

// ######################################################## Ticket Fields
// ====================================== Listing Tickets Fields
TicketFields.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['ticket_fields'], cb);//all
};


// ====================================== Viewing Tickets Fields
TicketFields.prototype.show = function (options, ticketFieldID, cb) {
  this.request(options, 'GET', ['ticket_fields', ticketFieldID], cb);
};

// ====================================== Creating Tickets Fields
TicketFields.prototype.create = function (options, ticketField, cb) {
  this.request(options, 'POST', ['ticket_fields'], ticketField,  cb);
};

// ====================================== Updating Tickets Fields
TicketFields.prototype.update = function (options, ticketFieldID, ticketField, cb) {
  this.request(options, 'PUT', ['ticket_fields', ticketFieldID], ticketField,  cb);
};

// ====================================== Deleting Tickets Fields
TicketFields.prototype.delete = function (options, ticketFieldID, cb) {
  this.request(options, 'DEL', ['ticket_fields', ticketFieldID],  cb);
};

