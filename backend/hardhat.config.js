require("@nomicfoundation/hardhat-toolbox");
const fs = require('fs');

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: "https://rpc-mumbai.polygon.technology/" // Replace with your Infura project ID
      }
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
