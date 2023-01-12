module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  }
};
const truffle = artifacts.require("truffle");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("truffle", function (/* accounts */) {
  it("should assert true", async function () {
    await truffle.deployed();
    return assert.isTrue(true);
  });
});
