var Election = artifacts.require("../contracts/multiDataPoll.sol");

module.exports = function(deployer) {
  deployer.deploy(multiDataPoll);
};
