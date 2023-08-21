const { expect, assert } = require('chai');
const { ethers } = require('hardhat');

describe('AIPrompt Contract', function () {
  let aiPrompt;
  let owner, user1, user2;
  const TOKEN_ID = 0;
  const DURATION = 86400; 
  const AMOUNT = ethers.utils.parseEther('1'); 

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const AIPrompt = await ethers.getContractFactory('AIPrompt');

    aiPrompt = await AIPrompt.deploy();
    await aiPrompt.deployed();
    // console.log(aiPrompt)
  });
  
  it('Should retrieve current token ID', async function () {
    console.log(aiPrompt.address);
    console.log('Minting')
    await aiPrompt.safeMint(owner.address,"ipfs");

    console.log('Creating Raffle')
    await aiPrompt.createRaffle(0,100,100);

    console.log('Entering Raffle')
    await aiPrompt.enterRaffle(0, {value : 1000, gasLimit: 6000000});

    const arr = await aiPrompt.getParticipants(0);
    console.log(arr);

    const index = await aiPrompt.particantCount(0);
    console.log(index);

    const num = await aiPrompt.getPseudorandomNumber(0,0,0, {gasLimit: 6000000});
    console.log(num);

    await aiPrompt.transferFrom(aiPrompt.address,owner.address,0,{gasLimit: 6000000});

    const ownerCheck = await aiPrompt.ownerOf(0);
    console.log(ownerCheck)
    console.log(owner.address);
  });

  

});
