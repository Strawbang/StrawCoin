// StrawCoinStacking.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StrawCoinStacking is Ownable {

    IERC20 public stakingToken;

    IERC20 public rewardToken;

    uint256 public stakingStartTime;
    uint256 public stakingEndTime;

    uint256 public stakingRate;

    mapping(address => uint256) public stakedBalance;

    event Staked(address indexed user, uint256 amount);

    event Unstaked(address indexed user, uint256 amount);

    event RewardsClaimed(address indexed user, uint256 amount);

    constructor(
        address _stakingToken,
        address _rewardToken,
        uint256 _stakingStartTime,
        uint256 _stakingEndTime,
        uint256 _stakingRate
    ) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        stakingStartTime = _stakingStartTime;
        stakingEndTime = _stakingEndTime;
        stakingRate = _stakingRate;
    }

    function stake(uint256 amount) external {
        require(block.timestamp >= stakingStartTime && block.timestamp <= stakingEndTime, "Staking not allowed at the moment");
        require(amount > 0, "Cannot stake zero tokens");

        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakedBalance[msg.sender] = stakedBalance[msg.sender] + amount;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "Cannot unstake zero tokens");
        require(stakedBalance[msg.sender] >= amount, "Insufficient staked balance");

        stakingToken.transfer(msg.sender, amount);
        stakedBalance[msg.sender] = stakedBalance[msg.sender] - amount;

        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() external {
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No rewards to claim");

        rewardToken.transfer(msg.sender, reward);

        emit RewardsClaimed(msg.sender, reward);
    }

    function calculateReward(address user) public view returns (uint256) {
        if (block.timestamp <= stakingStartTime || stakedBalance[user] == 0) {
            return 0;
        }

        uint256 stakingDuration = block.timestamp > stakingEndTime ? stakingEndTime - stakingStartTime : block.timestamp  - stakingStartTime;
        return stakingDuration * stakingRate * stakedBalance[user] / 1e18;
    }

    function withdrawRemainingRewards() external onlyOwner {
        require(block.timestamp > stakingEndTime, "Staking period not yet ended");

        uint256 remainingRewards = rewardToken.balanceOf(address(this));
        rewardToken.transfer(owner(), remainingRewards);
    }
}