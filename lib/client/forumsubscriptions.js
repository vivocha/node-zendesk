//ForumSubscriptions.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var ForumSubscriptions = exports.ForumSubscriptions = function (options) {
  this.jsonAPIName = 'forum_subscriptions';
  this.jsonAPIName2 = 'forum_subscription';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(ForumSubscriptions, Client);

// ######################################################## ForumSubscriptions
// ====================================== Listing ForumSubscriptions
ForumSubscriptions.prototype.list = function (options, cb) {
  this.requestAll(options, 'GET', ['forum_subscriptions'], cb);//all
};
ForumSubscriptions.prototype.listByForum = function (options, forumID, cb) {
  this.requestAll(options, 'GET', ['forum', forumID, 'subscriptions'], cb);//all
};



// ====================================== Viewing ForumSubscriptions

ForumSubscriptions.prototype.show = function (options, forumSubscriptionID, cb) {
  this.request(options, 'GET', ['forum_subscriptions', forumSubscriptionID], cb);
};

// ====================================== Creating ForumSubscriptions
ForumSubscriptions.prototype.create = function (options, forumSubscription, cb) {
  this.request(options, 'POST', ['forum_subscriptions'], forumSubscription, cb);
};


// ====================================== Deleting ForumSubscriptions
ForumSubscriptions.prototype.delete = function (options, forumSubscriptionID, cb) {
  this.request(options, 'DEL', ['forum_subscriptions', forumSubscriptionID],  cb);
};