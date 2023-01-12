var Migration = artifacts.require("./Migration.sol");

module.exports = function(deployer) {
  deployer.deploy(Migration);
};
