const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Apollo", (m) => {
  // Deploy ERC1155 contract if it hasn't been deployed yet
  const erc1155 = m.contract("ERC1155Extended", ["https://example.com/{id}"]);
  
  // Deploy ERC721 contract if it hasn't been deployed yet
  const erc721 = m.contract("ERC721Extended", ["TestToken", "TST", "https://example.com/{id}"]);

  // Deploy Marketplace contract with the addresses of ERC1155 and ERC721 contracts
  const marketplace = m.contract("Marketplace", [erc1155.address, erc721.address]);

  // If you need to call a setup function, do so here
  m.call(erc721, "setMarketplaceAddress", [marketplace.address]);

  return { erc1155, erc721, marketplace };
});
