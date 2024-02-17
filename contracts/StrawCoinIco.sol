// StrawCoinIco.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @custom:security-contact dbougouffa@gmail.com
contract StrawCoinIco is Ownable {
   IERC20 internal token;

   uint256 public rate;
   uint256 public openingTime;
   uint256 public closingTime;
   uint256 public hardCap;
   uint256 public raisedAmount;
   uint256 public tokenAmount;

   mapping(address => uint256) public balances;
   mapping(address => uint256) public balancesToken;

   event TokenPurchase(address indexed puchaser, uint256 amount);

   constructor(uint256 _rate, address _token, uint256 _openingTime, uint256 _closingTime, uint256 _hardCap) Ownable(msg.sender) {
      require(_rate > 0, "Rate is 0");
      require(_token != address(0), "Token address is 0");
      require(_closingTime > _openingTime, "ClosingTime need to be superior");
      rate = _rate;
      token = IERC20(_token);
      openingTime = _openingTime;
      closingTime = _closingTime;
      hardCap = _hardCap*10**18;
   }

   modifier icoOpen {
      require(block.timestamp >= openingTime && block.timestamp <= closingTime, "Ico not open");
      _;
   }

   modifier icoFinished {
      require(block.timestamp > closingTime, "Ico not finish");
      _;
   }

   function buyTokens() public payable icoOpen {
      require(tokenAmount < hardCap, "Hard Cap Reached");
      uint256 value = msg.value;
      uint256 tokens = value * rate;
      raisedAmount = raisedAmount + value;
      tokenAmount = tokenAmount + tokens;
      balances[msg.sender] = balances[msg.sender] + value;
      balancesToken[msg.sender] = balancesToken[msg.sender] + tokens;
      emit TokenPurchase(msg.sender, tokens);
   }

   function withdrawTokens() public icoFinished {
      uint256 amount = balances[msg.sender];
      require(amount > 0);
      balances[msg.sender] = 0;
      token.transfer(msg.sender, amount);
   }

   function getBalance() public view returns(uint256) {
      return balances[msg.sender];
   }
   
   function getBalanceToken() public view returns(uint256) {
      return balancesToken[msg.sender];
   }

   function getOpeningTime() public view returns(uint256) {
      return openingTime;
   }

   function getClosingTime() public view returns(uint256) {
      return closingTime;
   }

   function getHardCap() public view returns(uint256) {
      return hardCap;
   }
}