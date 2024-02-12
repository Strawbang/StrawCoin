// StrawCoin.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @custom:security-contact dbougouffa@gmail.com
contract StrawCoin is ERC20 {
    uint constant _initial_supply = 450_000_000 * (10 ** 18);
    constructor() ERC20("StrawCoin", "SC") {
        _mint(msg.sender, _initial_supply);
    }
}