var Election = artifacts.require("../contracts/yesNoPoll.sol");

module.exports = function(deployer) {
  deployer.deploy(yesNoPoll);
};
