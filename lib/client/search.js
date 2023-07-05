//Search.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Search = exports.Search = function (options) {
  this.jsonAPIName = 'results';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Search, Client);

// ######################################################## Search
// ====================================== Listing Search
Search.prototype.query = function (options, searchTerm, cb) {
  this.request(options, 'GET', ['search', {query: searchTerm, "sort_by": options.sort_by, "sort_order": options.sort_order}], cb);
};

Search.prototype.queryAll = function (options, searchTerm, cb) {
  this.requestAll(options, 'GET', ['search', {query: searchTerm}], cb);//all?
};

Search.prototype.queryAnonymous  = function (options, searchTerm, cb) {
  this.request(options, 'GET', ['portal', 'search', {query: searchTerm}], cb);
};


Search.prototype.queryAnonymousAll  = function (options, searchTerm, cb) {
  this.requestAll(options, 'GET', ['portal', 'search', {query: searchTerm}], cb);//all?
};

