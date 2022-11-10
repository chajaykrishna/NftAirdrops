const hre = require("hardhat");

async function main() {
  const AirDrop = await hre.ethers.getContractFactory("NFTAirdrop");
  const airdrop = await AirDrop.deploy();
  console.log("AirDrop contract deployed to:", airdrop.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
