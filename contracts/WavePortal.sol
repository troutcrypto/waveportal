// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint coolDown;
  uint256 private seed;
  uint256 totalWaves;
  mapping(address => uint256) public nwaves;
  mapping(address => uint256) public lastWavedAt;
  event NewWave(address indexedFrom, uint timeStamp, string message);

  struct Wave {
    address waver;
    string message;
    uint256 timeStamp;
  }
  Wave[] waves;
  // constructor must be payable
  constructor() payable {
    console.log("Wave portal contructor");
    seed = (block.timestamp + block.difficulty) % 100;
  }

  function wave(string memory _message) public {
    require (
      lastWavedAt[msg.sender] + 1 minutes < block.timestamp,
      "Wait 1 minute before waving again"
    );

    lastWavedAt[msg.sender] = block.timestamp;
    totalWaves += 1;
    console.log("%s has waved!", msg.sender);
    console.log("Received message:", _message);
    nwaves[msg.sender] += 1;

    waves.push(Wave(msg.sender, _message, block.timestamp));
    seed = (block.difficulty + block.timestamp + seed) % 100;
    emit NewWave(msg.sender, block.timestamp, _message);

    if (seed <= 50) {
      console.log("%s won! | seed: %s", msg.sender, seed); 
      uint256 prizeAmount = 0.0001 ether;
      require(
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has."
      );
      (bool success, ) = (msg.sender).call{value:prizeAmount}("");
      require(success, "Failed to withdraw money");
    } else {
      console.log("Didnt win lotto | seed:", seed);
    }

  }

  function numWaves() public view returns (uint256) {
    return nwaves[msg.sender];
  }
  
  function getAllWaves() public view returns (Wave[] memory) {
    return waves;
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves", totalWaves);
    return totalWaves;
  }
}