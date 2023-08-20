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
        address [] addresses;
    }
    
    mapping(address=>Raffle) private s_raffles;
    mapping(uint256=>address) private s_raffleId;
    mapping(address=>uint256) private s_proceeds;

    uint256 raffleId = 0 ;
    uint256 s_tokenId = 0 ;

    function safeMint(address to) public {
        _safeMint(to, s_tokenId);
        s_tokenId = s_tokenId + 1;
    }

    function createRaffle(uint256 _tokenId, uint256 duration, uint256 amount) public {
        
        // Make sure msg.sender has NFT
        
        Raffle memory newRaffle;
        newRaffle.tokenId = _tokenId;
        newRaffle.duration = duration;
        newRaffle.amount = amount;

        s_raffleId[raffleId] = msg.sender;
        raffleId += 1;
        s_raffles[msg.sender] = newRaffle;
        
    }

    function enterRaffle(uint256 _raffleId) public payable{
        address raffles_creator = s_raffleId[_raffleId];
        Raffle storage raffleDetails = s_raffles[raffles_creator];

        if(msg.value < raffleDetails.amount){
            revert("Less than require amount sent");
        }

        address [] storage temp = raffleDetails.addresses;
        temp.push(msg.sender);
        raffleDetails.addresses = temp;
        
        s_proceeds[raffles_creator] = s_proceeds[raffles_creator] + msg.value;
        raffleDetails.entries = raffleDetails.entries + 1;

    }

    function getCurrentTokenId () public view returns (uint256){
        // Current token ID of NFT
        return s_tokenId;
    }

    function getParticipants (uint256 _raffleId) public view returns(address []memory){
        // Should return array of participants
        return s_raffles[ s_raffleId [ _raffleId ] ].addresses;
    }

    function particantCount (uint256 _raffleId) public view returns(uint256 ){
        // Should return number of participants
        return s_raffles[ s_raffleId [ _raffleId ] ].entries;
    }

    function raffleFee (uint256 _raffleId) public view returns(uint256 ){
        // Should return price to enter 
        return s_raffles[ s_raffleId [ _raffleId ] ].amount;
    }
    
    function getRaffleTokenId (uint256 _raffleId) public view returns(uint256 ){
        // Should return token Id
        return s_raffles[ s_raffleId [ _raffleId ] ].tokenId;
    }

    function addressCreator(uint256 _raffleId) public view returns(address ){
        // Should return who created raffle
        return s_raffleId [ _raffleId ] ;
    }

}
