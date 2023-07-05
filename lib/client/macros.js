//Macros.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Macros = exports.Macros = function (options) {
  this.jsonAPIName = 'macros';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Macros, Client);

// ######################################################## Macros
// ====================================== Listing Macros
Macros.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['macros', 'active'], cb);//all
};

Macros.prototype.apply = function (options, macroID, cb) {
  this.request(options, 'GET', ['macros', macroID, 'apply'], cb);//all
};
Macros.prototype.applyTicket = function (options, ticketID, macroID, cb) {
  this.request(options, 'GET', ['tickets', ticketID, 'macros', macroID, 'apply'], cb);//all
};


