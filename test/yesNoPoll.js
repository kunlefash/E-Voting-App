// Import the contract ABI
const YesNoPoll = artifacts.require("yesNoPoll");

contract("yesNoPoll", accounts => {
  // Define the accounts to use for testing
  const owner = accounts[0];
  const voter1 = accounts[1];
  const voter2 = accounts[2];
  const voter3 = accounts[3];
  
  // Define the poll parameters for testing
  const pollName = "Test Poll";
  const pollDesc = "This is a test poll";
  const isPublic = false;
  const allowed = [voter1, voter2];
  const expiration = 60; // 1 minute
  
  // Define the poll hash for testing
  let pollHash;

  // Declare the contract instance
  let pollInstance;

  // Before each test, create a new instance of the contract
  beforeEach(async () => {
    pollInstance = await YesNoPoll.new();
  });

  // Test the createPoll function
  it("creates a new poll", async () => {
    const tx = await pollInstance.createPoll(pollDesc, pollName, isPublic, allowed, expiration, { from: owner });

    // Get the poll hash from the transaction logs
    pollHash = tx.logs[0].args[0];

    // Verify that the poll was created correctly
    assert.equal(await pollInstance.polls(pollHash).creator, owner);
    assert.equal(await pollInstance.polls(pollHash).name, pollName);
    assert.equal(await pollInstance.polls(pollHash).description, pollDesc);
    assert.equal(await pollInstance.polls(pollHash).isPublic, isPublic);
    assert.equal(await pollInstance.polls(pollHash).allowed.length, allowed.length);
    assert.equal(await pollInstance.polls(pollHash).expiration, expiration);
    assert.equal(await pollInstance.ownedPolls(owner), 1);
    assert.equal(await pollInstance.activePolls(owner).length, 1);
    assert.equal(await pollInstance.activePolls(owner)[0], pollHash);
  });

  // Test the addAllowedUsers function
  it("adds allowed users to a poll", async () => {
    // Create a new poll
    const tx = await pollInstance.createPoll(pollDesc, pollName, isPublic, allowed, expiration, { from: owner });
    pollHash = tx.logs[0].args[0];

    // Add a new allowed user to the poll
    const newAllowed = [voter3];
    await pollInstance.addAllowedUsers(pollHash, newAllowed, { from: owner });

    // Verify that the new user was added to the poll
    assert.equal(await pollInstance.polls(pollHash).allowed.length, allowed.length + newAllowed.length);
    assert.equal(await pollInstance.polls(pollHash).isAllowed[voter3], true);
  });

  // Test the vote function
  it("allows a user to vote in a poll", async () => {
    // Create a new poll
    const tx = await pollInstance.createPoll(pollDesc, pollName, isPublic, allowed, expiration, { from: owner });
    pollHash = tx.logs[0].args[0];

    // Have a user vote in the poll
    await pollInstance.vote(pollHash, true, { from: voter1 });

    // Verify that the user's vote was recorded
    assert.equal(await pollInstance.polls(pollHash).yesVotes, 1);
    assert.equal(await pollInstance.polls(pollHash).hasVoted[voter1], true
  });
});