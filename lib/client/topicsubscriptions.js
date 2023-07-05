//TopicSubscriptions.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var TopicSubscriptions = exports.TopicSubscriptions = function (options) {
  this.jsonAPIName = 'topic_subscriptions';
  this.jsonAPIName2 = 'topic_subscription';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TopicSubscriptions, Client);

// ######################################################## TopicSubscriptions
// ====================================== Listing TopicSubscriptions
TopicSubscriptions.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['topic_subscriptions'], cb);//all
};
TopicSubscriptions.prototype.listByTopic = function (options, topicID, cb) {
  this.requestAll(options, 'GET', ['topic', topicID, 'subscriptions'], cb);//all
};



// ====================================== Viewing TopicSubscriptions

TopicSubscriptions.prototype.show = function (options, topicSubscriptionsID, cb) {
  this.request(options, 'GET', ['topic_subscriptions', topicSubscriptionsID], cb);
};

// ====================================== Creating TopicSubscriptions
TopicSubscriptions.prototype.create = function (options, topicSubscription, cb) {
  this.request(options, 'POST', ['topic_subscriptions'], topicSubscription, cb);
};


// ====================================== Deleting TopicSubscriptions
TopicSubscriptions.prototype.delete = function (options, topicSubscriptionsID, cb) {
  this.request(options, 'DEL', ['topic_subscriptions', topicSubscriptionsID],  cb);
};