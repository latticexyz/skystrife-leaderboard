// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

/* Autogenerated file. Do not edit manually. */

/**
 * @title IPlayerRegisterSystem
 * @dev This interface is automatically generated from the corresponding system contract. Do not edit manually.
 */
interface IPlayerRegisterSystem {
  function register(bytes32 matchEntity, uint256 spawnIndex, bytes32 heroChoice) external returns (bytes32 player);
}
