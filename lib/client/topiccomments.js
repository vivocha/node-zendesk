//TopicComments.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var TopicComments = exports.TopicComments = function (options) {
  this.jsonAPIName = 'topic_comments';
  this.jsonAPIName2 = 'topic_comment';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TopicComments, Client);

// ######################################################## TopicComments
// ====================================== Listing TopicComments
TopicComments.prototype.list = function (options, topicID, cb) {
  this.requestAll(options, 'GET', ['topics', topicID, 'comments'], cb);//all
};

TopicComments.prototype.listByUser = function (options, userID, cb) {
  this.requestAll(options, 'GET', ['users', userID, 'topic_comments'], cb);//all
};


// ====================================== Viewing TopicComments

TopicComments.prototype.show = function (options, topicID, commentID, cb) {
  this.request(options, 'GET', ['topics', topicID, 'comments', commentID], cb);
};

TopicComments.prototype.showByUser = function (options, userID, commentID, cb) {
  this.request(options, 'GET', ['users', userID, 'topic_comments', commentID], cb);
};

// ====================================== Creating TopicComments
TopicComments.prototype.create = function (options, topicID, comment, cb) {
  this.request(options, 'POST', ['topics', topicID, 'comments'], comment, cb);
};

// ====================================== Updating TopicComments

TopicComments.prototype.update = function (options, topicID, commentID, comment, cb) {
  this.request(options, 'PUT', ['topics', topicID, 'comments', commentID], comment, cb);
};


// ====================================== Deleting TopicComments
TopicComments.prototype.delete = function (options, topicID, commentID, cb) {
  this.request(options, 'DEL', ['topics', topicID, 'comments', commentID], cb);
};
