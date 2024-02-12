import { ethers } from "hardhat";


async function main() {
  try {
    const StrawCoinIco = await ethers.getContractFactory("StrawCoinIco");
    const strawcoin = await StrawCoinIco.deploy(100000, '0x98E627b360e5Aa602E2F1427047e12d949007c02', 1707531426, 1710037026, 200000);

    const txReceipt = await strawcoin.deploymentTransaction()?.wait();

    console.log("Contract StrawCoinIco deployed successfully at address:", txReceipt?.contractAddress);
  } catch (error) {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
  }
}

main();