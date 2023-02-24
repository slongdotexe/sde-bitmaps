import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-network-helpers";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/ethers-v5";
import "@typechain/hardhat";
import "dotenv/config";
import "hardhat-deploy";
import "hardhat-tracer";
import "solidity-coverage";

import { HardhatUserConfig } from "hardhat/types";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
        blockNumber: 14252603,
        enabled: true,
      },
      saveDeployments: true,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      saveDeployments: true,
    },
    localhost: {
      saveDeployments: false,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: 0,
    alice: 1,
    bob: 2,
    carol: 3,
    ted: 4,
  },
};

export default config;
