// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract ERC1155Extended is ERC1155, Ownable, Pausable {
    mapping(uint256 => uint256) private _totalSupply;

    event TokenMinted(address indexed account, uint256 indexed tokenId, uint256 amount);
    event TokenBurned(address indexed account, uint256 indexed tokenId, uint256 amount);

    constructor(string memory uri) ERC1155(uri) Ownable(msg.sender){}

    function mintToken(address account, uint256 tokenId, uint256 amount, bytes memory data) external onlyOwner whenNotPaused {
        _mint(account, tokenId, amount, data);
        _totalSupply[tokenId] += amount;  // Track total supply
        emit TokenMinted(account, tokenId, amount);
    }

    function burnToken(address account, uint256 tokenId, uint256 amount) external whenNotPaused {
        require(balanceOf(account, tokenId) >= amount, "Insufficient balance to burn");
        _burn(account, tokenId, amount);
        _totalSupply[tokenId] -= amount;  // Update total supply
        emit TokenBurned(account, tokenId, amount);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function totalSupply(uint256 tokenId) external view returns (uint256) {
        return _totalSupply[tokenId];
    }

    function isTokenOwner(address account, uint256 tokenId) external view returns (bool) {
        return balanceOf(account, tokenId) > 0;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function revokeMintingRights() external onlyOwner {
        // Logic to revoke minting rights can be added here, if necessary
    }
}
