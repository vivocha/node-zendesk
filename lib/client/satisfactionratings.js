//SatisfactionRatings.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var SatisfactionRatings = exports.SatisfactionRatings = function (options) {
  this.jsonAPIName = 'satisfaction_ratings';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(SatisfactionRatings, Client);

// ######################################################## SatisfactionRatings
// ====================================== Listing SatisfactionRatings
SatisfactionRatings.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['satisfaction_ratings'], cb);//all
};

SatisfactionRatings.prototype.received = function (options, cb) {
  this.requestAll(options, 'GET', ['satisfaction_ratings', 'received'], cb);//all
};

SatisfactionRatings.prototype.show = function (options, satisfactionRatingID, cb) {
  this.request(options, 'GET', ['satisfaction_ratings', satisfactionRatingID], cb);//all
};


