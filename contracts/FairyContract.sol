// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FairyContract is ERC20 {
    constructor() ERC20("Fairy", "FAY") {

    }

    function mint(uint256 supply) public {
        _mint(msg.sender, supply);
    }
}
