// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./erc1155.sol";
import "./erc721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error InsufficientBalance(uint256 required, uint256 actual);

struct MarketItem {
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
    uint256 listingTime;
    uint256 expirationTime; // For listing expiration
}

contract Marketplace is Ownable{
    ERC1155Extended private erc1155Contract;
    ERC721Extended private erc721Contract;
    mapping(uint256 => MarketItem) public marketItems;
    mapping(address => MarketItem[]) public purchaseHistory; // To track user purchases

    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTPurchased(address indexed buyer, uint256 indexed tokenId);
    event NFTTransferred(address indexed from, address indexed to, uint256 indexed tokenId);
    event FundsWithdrawn(address indexed seller, uint256 amount);

    constructor(address erc1155Address, address erc721Address) Ownable(msg.sender){
        erc1155Contract = ERC1155Extended(erc1155Address);
        erc721Contract = ERC721Extended(erc721Address);
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");
        marketItems[tokenId] = MarketItem({
            tokenId: tokenId,
            seller: payable(msg.sender),
            owner: payable(address(0)),
            price: price,
            sold: false,
            listingTime: block.timestamp,
            expirationTime: block.timestamp + 7 days // Set expiration to 7 days
        });
        emit NFTListed(tokenId, msg.sender, price);
    }

    function updateListing(uint256 tokenId, uint256 newPrice) external {
        require(msg.sender == marketItems[tokenId].seller, "Only seller can update listing");
        require(newPrice > 0, "Price must be greater than zero");

        marketItems[tokenId].price = newPrice;
        emit NFTListed(tokenId, marketItems[tokenId].seller, newPrice);
    }

    function transferNFT(address recipient, uint256 tokenId) external {
        require(msg.sender == marketItems[tokenId].owner, "Caller must be the owner");
        require(recipient != address(0), "Recipient cannot be the zero address");

        marketItems[tokenId].owner = payable(recipient);
        erc721Contract.safeTransferFrom(msg.sender, recipient, tokenId);

        emit NFTTransferred(msg.sender, recipient, tokenId);
    }

    function calculateFee(uint256 price) internal pure returns (uint256) {
        return price * 5 / 100; // 5% marketplace fee
    }

    function buyNFT(uint256 tokenId) external payable {
        MarketItem storage item = marketItems[tokenId];
        require(msg.value >= item.price + calculateFee(item.price), "Insufficient funds");
        require(item.expirationTime > block.timestamp, "Listing has expired");

        uint256 fee = calculateFee(item.price);
        erc721Contract.safeTransferFrom(item.seller, msg.sender, tokenId);
        item.owner = payable(msg.sender);
        item.sold = true;
        item.seller.transfer(msg.value - fee);

        // Track purchase history
        purchaseHistory[msg.sender].push(item);
        emit NFTPurchased(msg.sender, tokenId);
    }

    function cancelListing(uint256 tokenId) external {
        require(msg.sender == marketItems[tokenId].seller, "Only seller can cancel listing");
        delete marketItems[tokenId];
    }

    function withdrawEarnings() external {
        uint256 balance = address(this).balance;
        require(balance > 0, "No earnings to withdraw");

        payable(msg.sender).transfer(balance);
        emit FundsWithdrawn(msg.sender, balance);
    }

    function approveMarketplace(address marketplace) external {
        require(msg.sender == owner(), "Caller must be the owner");
        erc721Contract.setApprovalForAll(marketplace, true);
    }

    function getPurchaseHistory(address user) external view returns (MarketItem[] memory) {
        return purchaseHistory[user];
    }
}
