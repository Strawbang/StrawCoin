import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";

const { mnemonic } = require('./secrets.json');

// task("accounts", "Prints the list of accounts", async () => {
//   const accounts = await ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    testnet: {
      url: "https://eth-sepolia.g.alchemy.com/v2/-j0geiZ4zEawRKoJUbNW2ut5WDO9RHG3",
      chainId: 11155111,
      gasPrice: 'auto',
      accounts: {mnemonic: mnemonic}
    },
    hardhat: {
      accounts: {mnemonic: mnemonic},
      chainId: 1337,
    },
  },
};

export default config;
