const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("NFT Marketplace", function () {
    async function deployFixture() {
        const [owner, user1, user2] = await ethers.getSigners();
    
        const ERC1155 = await ethers.getContractFactory("ERC1155Extended");
        const ERC721 = await ethers.getContractFactory("ERC721Extended");
        const MARKETPLACE = await ethers.getContractFactory("Marketplace");
    
        // Provide the necessary arguments for ERC721 deployment
        const erc721 = await ERC721.deploy("MyNFT", "MNFT", "ipfs://uri-base/");
        const erc1155 = await ERC1155.deploy(); // Add constructor arguments if required
        const marketplace = await MARKETPLACE.deploy(erc1155.address, erc721.address);
    
        // Mint some ERC1155 tokens
        await erc1155.mintToken(user1.address, 1, 100, "");
        await erc1155.mintToken(user2.address, 2, 100, "");
        await erc1155.mintToken(owner.address, 3, 100, ""); // Owner's token
    
        // Approve marketplace to spend tokens
        await erc1155.approveMarketplace(marketplace.address);
    
        return { erc1155, erc721, marketplace, owner, user1, user2 };
    }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { marketplace, owner } = await loadFixture(deployFixture);
      expect(await marketplace.owner()).to.equal(owner.address);
    });

    it("Should set the right ERC1155 and ERC721 addresses", async function () {
      const { marketplace, erc1155, erc721 } = await loadFixture(deployFixture);
      expect(await marketplace.erc1155()).to.equal(erc1155.address);
      expect(await marketplace.erc721()).to.equal(erc721.address);
    });
  });

  describe("Token Operations", function () {
    it("Should allow buying and transferring NFT ownership", async function () {
      const { marketplace, owner, user1, erc1155 } = await loadFixture(deployFixture);
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.1");

      await marketplace.listNFT(tokenId, price);
      await user1.sendTransaction({
        to: marketplace.address,
        value: price,
        data: marketplace.interface.encodeFunctionData("buyNFT", [tokenId]),
      });

      expect(await erc1155.balanceOf(user1.address, tokenId)).to.equal(100);
      expect(await erc1155.balanceOf(owner.address, tokenId)).to.equal(0);
    });

    it("Should emit events on buying and listing", async function () {
      const { marketplace, owner, user1 } = await loadFixture(deployFixture);
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.1");

      await expect(marketplace.listNFT(tokenId, price))
        .to.emit(marketplace, "NFTListed")
        .withArgs(tokenId, owner.address, price);

      await expect(user1.sendTransaction({
        to: marketplace.address,
        value: price,
        data: marketplace.interface.encodeFunctionData("buyNFT", [tokenId]),
      }))
        .to.emit(marketplace, "NFTPurchased")
        .withArgs(user1.address, tokenId);
    });
  });

  describe("Listing Management", function () {
    it("Should allow updating a listing", async function () {
      const { marketplace, owner } = await loadFixture(deployFixture);
      const tokenId = 1;
      let price = ethers.utils.parseEther("0.1");

      await marketplace.listNFT(tokenId, price);
      price = ethers.utils.parseEther("0.2");

      await marketplace.updateListing(tokenId, price);

      const listing = await marketplace.getListing(tokenId);
      expect(listing.price).to.equal(price);
    });

    it("Should allow cancelling a listing", async function () {
      const { marketplace, owner } = await loadFixture(deployFixture);
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.1");

      await marketplace.listNFT(tokenId, price);
      await marketplace.cancelListing(tokenId);

      await expect(marketplace.getListing(tokenId)).to.be.revertedWith("Listing not found");
    });
  });

  describe("Gas Cost Limits", function () {
    it("Should have reasonable gas costs for basic operations", async function () {
      const { marketplace, user1 } = await loadFixture(deployFixture);
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.1");

      await marketplace.listNFT(tokenId, price);

      const tx = await user1.sendTransaction({
        to: marketplace.address,
        value: price,
        data: marketplace.interface.encodeFunctionData("buyNFT", [tokenId]),
      });
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;

      expect(gasUsed).to.be.lessThan(80000); // Adjust based on expected usage
    });
  });

  describe("Edge Cases", function () {
    it("Should prevent buying an unlisted NFT", async function () {
      const { marketplace, user1 } = await loadFixture(deployFixture);
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.1");

      await expect(user1.sendTransaction({
        to: marketplace.address,
        value: price,
        data: marketplace.interface.encodeFunctionData("buyNFT", [tokenId]),
      })).to.be.revertedWith("Token not found or not approved");
    });

    it("Should handle expired listings", async function () {
      const { marketplace, owner, user1 } = await loadFixture(deployFixture);
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.1");

      await marketplace.listNFT(tokenId, price, 1); // Expire in 1 second
      await time.increase(2); // Increase time by 2 seconds

      await expect(user1.sendTransaction({
        to: marketplace.address,
        value: price,
        data: marketplace.interface.encodeFunctionData("buyNFT", [tokenId]),
      })).to.be.revertedWith("Listing has expired");
    });
  });

  describe("Withdraw Earnings", function () {
    it("Should allow owner to withdraw earnings", async function () {
      const { marketplace, user1 } = await loadFixture(deployFixture);
      const tokenId = 1;
      const price = ethers.utils.parseEther("0.1");

      await marketplace.listNFT(tokenId, price);
      await user1.sendTransaction({
        to: marketplace.address,
        value: price,
        data: marketplace.interface.encodeFunctionData("buyNFT", [tokenId]),
      });

      const initialOwnerBalance = await ethers.provider.getBalance(marketplace.owner());
      await marketplace.withdrawEarnings();
      const finalOwnerBalance = await ethers.provider.getBalance(marketplace.owner());

      expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
    });
  });

  // Additional tests can be added here for comprehensive coverage.
});
