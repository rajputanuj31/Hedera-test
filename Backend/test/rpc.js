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

    await aiPrompt.safeMint(owner.address,"ipfs");
    const newTokenId = await aiPrompt.getCurrentTokenId();
    expect(newTokenId).to.equal(1);
  });

  it('Creates multiple raffles', async function(){

    await aiPrompt.safeMint(owner.address,"ipfs");
    await aiPrompt.safeMint(owner.address,"ipfs");

    const newTokenId = await aiPrompt.getCurrentTokenId();
    expect(newTokenId).to.equal(2);

    await aiPrompt.createRaffle(0,100,1000);

    const raffleFeeContract = await aiPrompt.raffleFee(0);
    const getRaffleTokenIdContract = await aiPrompt.getRaffleTokenId(0);

    expect(raffleFeeContract).to.equal(1000);
    expect(getRaffleTokenIdContract).to.equal(0);

    // Another raffle simultaneously

    await aiPrompt.createRaffle(1,200,2000);

    const raffleFeeContract_ = await aiPrompt.raffleFee(0);
    const getRaffleTokenIdContract_ = await aiPrompt.getRaffleTokenId(0);

    expect(raffleFeeContract_).to.equal(2000);
    expect(getRaffleTokenIdContract_).to.equal(1);

  });

  it('People entering raffle', async function (){
    
    await aiPrompt.safeMint(owner.address,"ipfs");
    await aiPrompt.createRaffle(0,100,1000);

    const newcontract = await aiPrompt.connect(user1);
    await newcontract.enterRaffle(0,{value : 1000});

    const count = await newcontract.getParticipants(0);
    expect(count[0]).to.equal(user1.address);

  });

  it('Fails at less amount', async function(){

    await aiPrompt.safeMint(owner.address,"ipfs");
    await aiPrompt.createRaffle(0,100,1000);

    const newcontract = await aiPrompt.connect(user1);
    await expect(newcontract.enterRaffle(0,{value : 100})).to.be.revertedWith("Less than require amount sent");

  });

  it('Fails if try to create NFT if does not own', async function (){
    await aiPrompt.safeMint(owner.address,"ipfs");
    const newcontract = await aiPrompt.connect(user1);
    await expect(newcontract.createRaffle(0,100,1000)).to.be.revertedWith("Not Owner");
  })

});
