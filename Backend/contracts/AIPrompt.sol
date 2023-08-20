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
    mapping(uint256=>address) s_raffleId;
    mapping(address=>uint256) s_proceeds;
    uint256 s_token = 0 ;

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

    function createRaffle(uint256 tokenId, uint256 duration, uint256 amount) public {
        
        // Make sure msg.sender has NFT
        
        Raffle memory newRaffle;
        newRaffle.tokenId = tokenId;
        newRaffle.duration = duration;
        newRaffle.amount = amount;

        s_token += 1;
        s_raffles[msg.sender] = newRaffle;
    }

    function enterRaffle(uint256 raffleId) public payable{
        address raffles_creator = s_raffleId[raffleId];
        Raffle memory raffleDetails = s_raffles[raffles_creator];

        if(msg.value < raffleDetails.amount){
            revert("Less than require amount sent");
        }
        
        s_proceeds[raffles_creator] = s_proceeds[raffles_creator] + msg.value;

    }

}