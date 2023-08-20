// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AIPrompt is ERC721 {
    constructor() ERC721("AI Prompt", "AIP") {}

    struct Raffle{
        uint256 tokenId;
        uint256 amount;
        uint256 duration;
        bool isOpen;
        uint256 entries;
    }
    
    mapping(address=>Raffle) s_raffles;

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

    function createRaffle(uint256 tokenId, uint256 duration, uint256 amount) public {
        Raffle memory newRaffle;
        newRaffle.tokenId = tokenId;
        newRaffle.duration = duration;
        newRaffle.amount = amount;
        s_raffles[msg.sender] = newRaffle;
    }

    
}