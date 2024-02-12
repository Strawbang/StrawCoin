import { expect } from "chai";
import { ContractTransactionResponse } from "ethers";
import { ethers } from "hardhat";
import { StrawCoin } from "../typechain-types";

describe("StrawCoin", async () => {
    let StrawCoin: StrawCoin & { deploymentTransaction(): ContractTransactionResponse; };

    before(async () => {
        const Token = await ethers.getContractFactory("StrawCoin");
        StrawCoin = await Token.deploy();
    });

    it("Deployment should assign the name of token", async () => {

        expect(await StrawCoin.name()).to.equal("StrawCoin");
    })
    it("Deployment should assign the symbol of token", async () => {

        expect(await StrawCoin.symbol()).to.equal("SC");
    })
    it("Deployment should assign the total supply of tokens to the owner", async () => {
        const [owner] = await ethers.getSigners();
        const ownerBalance = await StrawCoin.balanceOf(owner.address);

        expect(await StrawCoin.totalSupply()).to.equal(ownerBalance);
    });
});