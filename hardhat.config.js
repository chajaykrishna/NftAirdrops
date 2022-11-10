require("@nomicfoundation/hardhat-toolbox");
require ('dotenv').config();
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-ethers")
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-etherscan");


/** @type import('hardhat/config').HardhatUserConfig */
const {PrivateKey, mainnetUrl, MumbaiURL, EtherscanApiKey} = process.env;
const COINMARKETCAPAPIKEY = process.env.COINMARKETCAP;


module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "hardhat",
  networks: {
    mumbai: {
      url: MumbaiURL,
      accounts: [PrivateKey]
    },
    mainnet: {
      url: mainnetUrl,
      accounts: [PrivateKey]
    }
  },
    etherscan: {
      apiKey: EtherscanApiKey
    },

    gasReporter: {
          enabled: true,
          outputFile: "gas-reporter.txt",
          noColors: true,
          currency: 'USD',
          coinmarketcap: COINMARKETCAPAPIKEY,
          token: "MATIC",
        },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        },
      },
    // contractSizer: {
    //       alphaSort: true,
    //       disambiguatePaths: false,
    //       runOnCompile: true,
    //       strict: true,
    //       only: [''],
    //       outputFile: "contract-sizer.txt",
    //         }

};

