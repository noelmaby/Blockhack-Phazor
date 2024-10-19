const hre = require("hardhat");
const fs = require("fs");

async function main() {
  try {
    // Deploy ERC1155 contract
    const ERC1155 = await hre.ethers.getContractFactory("ERC1155Extended");
    const erc1155 = await ERC1155.deploy("https://example.com/{id}");
    await erc1155.waitForDeployment();
    console.log("ERC1155 deployed to:", erc1155.address);

    // Deploy ERC721 contract
    const ERC721 = await hre.ethers.getContractFactory("ERC721Extended");
    const erc721 = await ERC721.deploy("TestToken", "TST", "https://example.com/{id}");
    await erc721.waitForDeployment();
    console.log("ERC721 deployed to:", erc721.address);

    // Deploy Marketplace contract
    const NFTMarketplace = await hre.ethers.getContractFactory("Marketplace");
    const nftMarketplace = await NFTMarketplace.deploy(erc1155.address, erc721.address);
    await nftMarketplace.waitForDeployment();
    console.log("NFTMarketplace deployed to:", nftMarketplace.address);

    // Write the marketplace address to config.js
    fs.writeFileSync('./config.js', `
    export const marketplaceAddress = "${nftMarketplace.address}";
    `);

    console.log("Deployment completed successfully!");
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
