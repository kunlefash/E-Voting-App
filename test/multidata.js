const assert = require('chai').assert;
const mulitDataPoll = artifacts.require('mulitDataPoll');

contract('mulitDataPoll', function(accounts) {
  let contractInstance;
  const creator = accounts[0];
  const voter = accounts[1];
  const name = "Test Poll";
  const description = "This is a test poll.";
  const options = ["Option 1", "Option 2", "Option 3"];
  const allowed = [voter];
  const isPublic = false;
  const expiration = 3600; // 1 hour in seconds

  beforeEach(async () => {
    contractInstance = await mulitDataPoll.deployed();
    await contractInstance.createPoll(description, name, options, allowed, isPublic, expiration, {from: creator});
  });

  it('should create a poll', async () => {
    const pollHash = await contractInstance.calcPollHash(name, creator);
    const poll = await contractInstance.polls(pollHash);
    assert.equal(poll.creator, creator, "Creator is incorrect.");
    assert.equal(poll.name, name, "Name is incorrect.");
    assert.equal(poll.description, description, "Description is incorrect.");
    assert.deepEqual(poll.options, options, "Options are incorrect.");
    assert.deepEqual(poll.allowed, allowed, "Allowed users are incorrect.");
    assert.equal(poll.isPublic, isPublic, "Public status is incorrect.");
    assert.equal(poll.expiration, expiration, "Expiration time is incorrect.");
  });

  it('should allow users to vote on a poll', async () => {
    await contractInstance.vote(await contractInstance.calcPollHash(name, creator), 1, {from: voter});
    const poll = await contractInstance.polls(await contractInstance.calcPollHash(name, creator));
    assert.equal(poll.voteResults[1], 1, "Vote was not recorded.");
    assert.equal(poll.hasVoted[voter], true, "Voter was not marked as having voted.");
  });

  it('should not allow users to vote twice', async () => {
    await contractInstance.vote(await contractInstance.calcPollHash(name, creator), 1, {from: voter});
    try {
      await contractInstance.vote(await contractInstance.calcPollHash(name, creator), 2, {from: voter});
    } catch (error) {
      assert.include(error.message, "revert", "Error message must contain revert");
      const poll = await contractInstance.polls(await contractInstance.calcPollHash(name, creator));
      assert.equal(poll.voteResults[1], 1, "Vote should not have been recorded.");
      assert.equal(poll.hasVoted[voter], true, "Voter should still be marked as having voted.");
    }
  });
});
