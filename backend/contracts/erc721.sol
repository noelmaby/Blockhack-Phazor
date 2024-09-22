// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol"; // Import Pausable
import "./erc1155.sol"; // Import ERC1155 contract

contract ERC721Extended is ERC721, Ownable, Pausable {
    mapping (uint256 => string) private _tokenURIs;
    address private _marketplaceAddress;
    uint256 private _nextTokenId;
    uint256 private _totalSupply;
    string private _customBaseURI; // Base URI for metadata

    event TokenCreated(address indexed owner, uint256 indexed tokenId);
    event MarketplaceChanged(address indexed newMarketplace);
    event BaseURIChanged(string newBaseURI);

    constructor(string memory name, string memory symbol, string memory baseURI) ERC721(name, symbol) Ownable(msg.sender){
        _nextTokenId = 1;
        _customBaseURI = baseURI; // Initialize base URI
    }
    


    modifier onlyMarketplace() {
        require(msg.sender == _marketplaceAddress, "Not authorized: Caller is not the marketplace");
        _;
    }

    function createNewTokenFrom1155(uint256 tokenId) external onlyMarketplace whenNotPaused returns (uint256) {
        ERC1155Extended erc1155 = ERC1155Extended(_marketplaceAddress);
        require(erc1155.balanceOf(msg.sender, tokenId) > 0, "ERC1155: Insufficient balance to burn");
        
        uint256 newTokenId = _nextTokenId; // Get current token ID
        _nextTokenId++; // Increment for next token

        erc1155.burnToken(msg.sender, tokenId, 1);

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, string(abi.encodePacked(_customBaseURI, uint2str(newTokenId)))); // Use base URI
        _totalSupply++;

        emit TokenCreated(msg.sender, newTokenId);
        return newTokenId;
    }

    function setMarketplaceAddress(address _marketplaceAddress_) external onlyOwner {
        require(_marketplaceAddress_ != address(0), "ERC721Extended: Invalid marketplace address");
        require(ERC1155Extended(_marketplaceAddress_).supportsInterface(type(IERC1155).interfaceId), "Not a valid ERC1155 contract");
        _marketplaceAddress = _marketplaceAddress_;
        emit MarketplaceChanged(_marketplaceAddress_);
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _customBaseURI = newBaseURI;
        emit BaseURIChanged(newBaseURI);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function revokeMarketplacePermissions() external onlyOwner {
        _marketplaceAddress = address(0);
        emit MarketplaceChanged(address(0));
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // Helper function to convert uint to string
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            bstr[--k] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}
