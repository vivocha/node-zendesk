//Topics.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Topics = exports.Topics = function (options) {
  this.jsonAPIName = 'topics';
  this.jsonAPIName2 = 'topic';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Topics, Client);

// ######################################################## Topics
// ====================================== Listing Topics
Topics.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['topics'], cb);//all
};

Topics.prototype.listByForum = function (options, forumID, cb) {
  this.requestAll(options, 'GET', ['forums', forumID, 'topics'], cb);//all
};

Topics.prototype.listByUser = function (options, userID, cb) {
  this.requestAll(options, 'GET', ['users', userID, 'topics'], cb);//all
};


// ====================================== Viewing Topics

Topics.prototype.show = function (options, topicID, cb) {
  this.request(options, 'GET', ['topics', topicID], cb);
};

Topics.prototype.showMany = function (options, topicIDs, cb) {
  this.request(options, 'GET', ['topics', 'show_many', {ids: topicIDs}], cb);
};

// ====================================== Creating Topics
Topics.prototype.create = function (options, topic, cb) {
  this.request(options, 'POST', ['topics'], topic, cb);
};

// ====================================== Updating Topics

Topics.prototype.update = function (options, topicID, topic, cb) {
  this.request(options, 'PUT', ['topics', topicID], topic, cb);
};


// ====================================== Deleting Topics
Topics.prototype.delete = function (options, topicID, cb) {
  this.request(options, 'DEL', ['topics', topicID],  cb);
};