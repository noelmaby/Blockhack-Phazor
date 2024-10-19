const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ERC1155
  const ERC1155 = await ethers.getContractFactory("ERC1155Extended");
  const erc1155 = await ERC1155.deploy("https://example.com/{id}");
  
  // Wait for deployment to complete and log the address
  await erc1155.deployed();
  console.log("ERC1155 deployed to:", erc1155.address);

  // Deploy ERC721
  const ERC721 = await ethers.getContractFactory("ERC721Extended");
  const erc721 = await ERC721.deploy("TestToken", "TST", "https://example.com/{id}");
  
  // Wait for deployment to complete and log the address
  await erc721.deployed();
  console.log("ERC721 deployed to:", erc721.address);

  // Deploy Marketplace
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(erc1155.address, erc721.address);
  
  // Wait for deployment to complete and log the address
  await marketplace.deployed();
  console.log("Marketplace deployed to:", marketplace.address);

  // Approve marketplace for both contracts
  await erc1155.approveMarketplace(marketplace.address);
  await erc721.setApprovalForAll(marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
