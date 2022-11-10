// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DummyERC721 is ERC721, Ownable {   

    // use counters
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    constructor () ERC721("DummyERC721", "D721") {
    }

    function mintNFT(address _to) onlyOwner external {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(_to, newItemId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://example.com/";
    }

}