// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FairyContract is ERC20 {
    constructor() ERC20("Fairy", "FAY") {}

    function mint(uint256 supply) public {
        _mint(msg.sender, supply);
    }
}
