// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Lottery = artifacts.require("./Lottery.sol");
module.exports = function(deployer) {
  deployer.deploy(Lottery);
};
