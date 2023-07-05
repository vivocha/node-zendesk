//Categories.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Categories = exports.Categories = function (options) {
  this.jsonAPIName = 'categories';
  this.jsonAPIName2 = 'category';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Categories, Client);

// ######################################################## Categories
// ====================================== Listing Categories
Categories.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['categories'], cb);//all
};


// ====================================== Viewing Categories

Categories.prototype.show = function (options, categoryID, cb) {
  this.request(options, 'GET', ['categories', categoryID], cb);
};

// ====================================== Creating Categories
Categories.prototype.create = function (options, category, cb) {
  this.request(options, 'POST', ['categories'], category, cb);
};

// ====================================== Updating Categories

Categories.prototype.update = function (options, categoryID, category, cb) {
  this.request(options, 'PUT', ['categories', categoryID], category, cb);
};


// ====================================== Deleting Categories
Categories.prototype.delete = function (options, categoryID, cb) {
  this.request(options, 'DEL', ['categories', categoryID],  cb);
};