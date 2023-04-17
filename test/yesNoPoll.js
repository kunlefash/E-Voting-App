const YesNoPoll = artifacts.require("yesNoPoll");

contract("yesNoPoll", accounts => {
  const owner = accounts[0];
  const voter1 = accounts[1];
  const voter2 = accounts[2];
  const voter3 = accounts[3];
  
  const pollName = "Test Poll";
  const pollDesc = "This is a test poll";
  const isPublic = false;
  const allowed = [voter1, voter2];
  const expiration = 60;

  let pollHash;

  let pollInstance;

  beforeEach(async () => {
    pollInstance = await YesNoPoll.new();
  });

  it("creates a new poll", async () => {
    const tx = await pollInstance.createPoll(pollDesc, pollName, isPublic, allowed, expiration, { from: owner });
    pollHash = tx.logs[0].args[0];

    assert.equal(await pollInstance.polls(pollHash).creator, owner, "Creator not set correctly");
    assert.equal(await pollInstance.polls(pollHash).name, pollName, "Name not set correctly");
    assert.equal(await pollInstance.polls(pollHash).description, pollDesc, "Description not set correctly");
    assert.equal(await pollInstance.polls(pollHash).isPublic, isPublic, "Privacy not set correctly");
    assert.equal(await pollInstance.polls(pollHash).allowed.length, allowed.length, "Allowed list not set correctly");
    assert.equal(await pollInstance.polls(pollHash).expiration, expiration, "Expiration not set correctly");
    assert.equal(await pollInstance.ownedPolls(owner), 1, "Owned poll count not incremented correctly");
    assert.deepEqual(await pollInstance.activePolls(owner), [pollHash], "Active poll not added correctly");
  });

  it("adds allowed users to a poll", async () => {
    const tx = await pollInstance.createPoll(pollDesc, pollName, isPublic, allowed, expiration, { from: owner });
    pollHash = tx.logs[0].args[0];

    const newAllowed = [voter3];
    await pollInstance.addAllowedUsers(pollHash, newAllowed, { from: owner });

    assert.equal(await pollInstance.polls(pollHash).allowed.length, allowed.length + newAllowed.length, "Allowed list not updated correctly");
    assert.isTrue(await pollInstance.polls(pollHash).isAllowed[voter3], "New user not added correctly");
  });

  it("allows a user to vote in a poll", async () => {
    const tx = await pollInstance.createPoll(pollDesc, pollName, isPublic, allowed, expiration, { from: owner });
    pollHash = tx.logs[0].args[0];

    await pollInstance.vote(pollHash, true, { from: voter1 });

    const poll = await pollInstance.polls(pollHash);
    assert.equal(poll.yesVotes, 1, "Yes vote count not incremented correctly");
    assert.isTrue(poll.hasVoted[voter1], "User vote not recorded correctly");
  });
});
