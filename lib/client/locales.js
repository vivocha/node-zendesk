//Locales.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Locales = exports.Locales = function (options) {
  this.jsonAPIName = 'locales';
  this.jsonAPIName2 = 'locale';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Locales, Client);

// ######################################################## Locales
// ====================================== Listing Locales
Locales.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['locales'], cb);//all
};


// ====================================== Viewing Locales

Locales.prototype.show = function (options, localeID, cb) {
  this.request(options, 'GET', ['locales', localeID], cb);
};

Locales.prototype.showCurrent = function (options, cb) {
  this.request(options, 'GET', ['locales', 'current'], cb);
};
Locales.prototype.current = function (options, cb) {
  this.request(options, 'GET', ['locales', 'current'], cb);
};
