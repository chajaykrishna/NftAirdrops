const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Airdrop", function () {
 
  async function deployAirDropFixture() {

    // initialize signer and 9 accounts 
    const [owner, ...accounts] = await ethers.getSigners();

    const AirDrop = await ethers.getContractFactory("NFTAirdrop");
    const airdrop = await AirDrop.deploy();
    console.log("AirDrop contract deployed to:", airdrop.address);

    // deploy dummyERC721 contract
    const DummyERC721 = await hre.ethers.getContractFactory("DummyERC721");
    const dummyERC721 = await DummyERC721.connect(accounts[1]).deploy();
    console.log("DummyERC721 contract deployed to:", dummyERC721.address);

    return { airdrop, dummyERC721, owner, accounts };
  }


  describe("Test ERC721 airdrop", function () {

    it("mint 10  and airdrop them", async function () {
      const { airdrop, dummyERC721, owner, accounts } = await loadFixture(deployAirDropFixture);

      // mint 10 NFTs to owner
      for(let i = 0; i<10; i++) {
        tx = await dummyERC721.mintNFT(owner.address);
        await tx.wait();
      }
      
      // check owner's balance
      expect(await dummyERC721.balanceOf(owner.address)).to.equal(10);

      // allow airdrop contract to transfer NFTs
      tx = await dummyERC721.connect(owner).setApprovalForAll(airdrop.address, true);
      await tx.wait();

      // check allowance
      expect(await dummyERC721.isApprovedForAll(owner.address, airdrop.address)).to.equal(true);

      const nft_ids = [1,2,3,4,5,6,7,8,9, 10];
      const users = []

      for(let i = 0; i<10; i++) {
        users.push(accounts[i].address);
      }
      // airdrop 10 NFTs to accounts
      tx = await airdrop.connect(owner).erc721Airdrop(dummyERC721.address, nft_ids, users);
      await tx.wait();
      // check if accounts have received NFTs
      for(let i = 0; i<10; i++) {
        expect(await dummyERC721.balanceOf(users[i])).to.equal(1);
      } 
      // check if owner's balance is 0
      expect(await dummyERC721.balanceOf(owner.address)).to.equal(0);
    });

  });
});