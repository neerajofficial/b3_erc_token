//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NSToken is ERC20 {
	constructor() ERC20("Neeraj Sing Token", "NST") {
		_mint(msg.sender, 1000000 * (10 ** 18));
	}
}