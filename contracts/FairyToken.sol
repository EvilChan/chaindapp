// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract FairyToken is Ownable, ERC20 {
    constructor() Ownable(msg.sender) ERC20("Fairy", "FAY") {}

    function mint(uint256 supply) public onlyOwner {
        _mint(msg.sender, supply);
    }
}
