require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      accounts: [`${process.env.PRIVATE_KEY}`],
      url: process.env.SEPOLIA_TESTNET_RPC_URL,
    },
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
  },
};
