const assert = require('chai').assert;
const mulitDataPoll = artifacts.require('mulitDataPoll');

contract('mulitDataPoll', function(accounts) {

  it('should create a poll', function() {
    var contractInstance;
    var creator = accounts[0];
    var name = "Test Poll";
    var description = "This is a test poll.";
    var options = ["Option 1", "Option 2", "Option 3"];
    var allowed = [accounts[1], accounts[2]];
    var isPublic = false;
    var expiration = 3600; // 1 hour in seconds
    
    return mulitDataPoll.deployed().then(function(instance) {
      contractInstance = instance;
      return contractInstance.createPoll(description, name, options, allowed, isPublic, expiration, {from: creator});
    }).then(function() {
      return contractInstance.calcPollHash(name, creator);
    }).then(function(pollHash) {
      return contractInstance.polls(pollHash);
    }).then(function(poll) {
      assert.equal(poll.creator, creator, "Creator is incorrect.");
      assert.equal(poll.name, name, "Name is incorrect.");
      assert.equal(poll.description, description, "Description is incorrect.");
      assert.deepEqual(poll.options, options, "Options are incorrect.");
      assert.deepEqual(poll.allowed, allowed, "Allowed users are incorrect.");
      assert.equal(poll.isPublic, isPublic, "Public status is incorrect.");
      assert.equal(poll.expiration, expiration, "Expiration time is incorrect.");
    });
  });

  it('should allow users to vote on a poll', function() {
    var contractInstance;
    var creator = accounts[0];
    var voter = accounts[1];
    var name = "Test Poll";
    var description = "This is a test poll.";
    var options = ["Option 1", "Option 2", "Option 3"];
    var allowed = [voter];
    var isPublic = false;
    var expiration = 3600; // 1 hour in seconds

    return mulitDataPoll.deployed().then(function(instance) {
      contractInstance = instance;
      return contractInstance.createPoll(description, name, options, allowed, isPublic, expiration, {from: creator});
    }).then(function() {
      return contractInstance.calcPollHash(name, creator);
    }).then(function(pollHash) {
      return contractInstance.vote(pollHash, 1, {from: voter});
    }).then(function() {
      return contractInstance.calcPollHash(name, creator);
    }).then(function(pollHash) {
      return contractInstance.polls(pollHash);
    }).then(function(poll) {
      assert.equal(poll.voteResults[1], 1, "Vote was not recorded.");
      assert.equal(poll.hasVoted[voter], true, "Voter was not marked as having voted.");
    });
  });

  it('should not allow users to vote twice', function() {
    var contractInstance;
    var creator = accounts[0];
    var voter = accounts[1];
    var name = "Test Poll";
    var description = "This is a test poll.";
    var options = ["Option 1", "Option 2", "Option 3"];
    var allowed = [voter];
    var isPublic = false;
    var expiration = 3600; // 1 hour in seconds

    return mulitDataPoll.deployed().then(function(instance) {
      contractInstance = instance;
      return contractInstance.createPoll(description, name, options, allowed, isPublic, expiration, {from: creator});
    })
  })
});