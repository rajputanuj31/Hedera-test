const { expect } = require('chai');
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
  });
  
  it('Should retrieve current token ID', async function () {
    const tokenId = await aiPrompt.getCurrentTokenId();
    expect(tokenId).to.equal(0);

    await aiPrompt.safeMint(owner.address);
    const newTokenId = await aiPrompt.getCurrentTokenId();
    expect(newTokenId).to.equal(1);
  });

});
