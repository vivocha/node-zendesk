//TopicVotes.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var TopicVotes = exports.TopicVotes = function (options) {
  this.jsonAPIName = 'topic_votes';
  this.jsonAPIName2 = 'topic_vote';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TopicVotes, Client);

// ######################################################## TopicVotes
// ====================================== Listing TopicVotes
TopicVotes.prototype.list = function (options, topicID, cb) {
  this.requestAll(options, 'GET', ['topics', topicID, 'votes'], cb);//all
};

TopicVotes.prototype.listByUser = function (options, userID, cb) {
  this.requestAll(options, 'GET', ['users', userID, 'topic_votes'], cb);//all
};


// ====================================== Viewing TopicVotes

TopicVotes.prototype.show = function (options, topicID, cb) {
  this.request(options, 'GET', ['topics', topicID, 'vote'], cb);//all
};


// ====================================== Creating TopicVotes
TopicVotes.prototype.create = function (options, topicID, vote, cb) {
  this.request(options, 'POST', ['topics', topicID, 'vote'], vote, cb);
};



// ====================================== Deleting TopicVotes
TopicVotes.prototype.delete = function (options, topicID, cb) {
  this.request(options, 'DEL', ['topics', topicID, 'vote'], cb);
};
