import { BaseContract, ContractTransactionResponse } from "ethers";
import { artifacts, ethers } from "hardhat";
import path from "path";

async function deployContract(contractName: string, args: any[]): Promise<string | null | undefined> {
  try {
    const ContractFactory = await ethers.getContractFactory(contractName);
    const contract = await ContractFactory.deploy(...args);
    
    const txReceipt = await contract.deploymentTransaction()?.wait();
    console.log(`Contract ${contractName} deployed successfully at address:`, txReceipt?.contractAddress);


    saveFrontendFiles(contract, contractName)
    return txReceipt?.contractAddress;
  } catch (error) {
    console.error(`Error deploying ${contractName} contract:`, error);
    process.exitCode = 1;
    throw error;
  }
}

async function saveFrontendFiles(token: BaseContract & { deploymentTransaction(): ContractTransactionResponse; } & Omit<BaseContract, keyof BaseContract>, contractName: string) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "client", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "address.json"),
    JSON.stringify({ [contractName]: await token.getAddress() }, undefined, 2),
  );

  const TokenArtifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    path.join(contractsDir, `${contractName}.json`),
    JSON.stringify(TokenArtifact, null, 2),
  );
}
async function main() {
  try {

    const strawcoin = await deployContract("StrawCoin", []);

    await deployContract("StrawCoinIco", [100000, strawcoin, 1707531426, 1710037026, 200000]);

  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();