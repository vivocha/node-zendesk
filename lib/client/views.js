//Views.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Views = exports.Views = function (options) {
  this.jsonAPIName = 'views';
  this.jsonAPIName2 = 'view';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Views, Client);

// ######################################################## Views
// ====================================== Listing Views
Views.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['views'], cb);//all
};

// ====================================== Listing Active Views
Views.prototype.listActive = function (options, cb) {
  this.requestAll(options, 'GET', ['views', 'active'], cb);//all
};



// ====================================== Viewing Views
Views.prototype.show = function (options, viewID, cb) {
  this.request(options, 'GET', ['views', viewID], cb);
};

Views.prototype.showCount = function (options, viewID, cb) {
  this.request(options, 'GET', ['views', viewID, 'count'], cb);
};

Views.prototype.showCounts = function (options, viewIDs, cb) {
  this.request(options, 'GET', ['views', 'count_many', {ids: viewIDs}], cb);
};
