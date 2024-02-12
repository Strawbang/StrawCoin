import { ethers } from "hardhat";


async function main() {
  try {
    const StrawCoin = await ethers.getContractFactory("StrawCoin");
    const strawcoin = await StrawCoin.deploy();

    const txReceipt = await strawcoin.deploymentTransaction()?.wait();

    console.log("Contract StrawCoin deployed successfully at address:", txReceipt?.contractAddress);
  } catch (error) {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
  }
}

main();