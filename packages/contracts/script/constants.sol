// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { ROOT_NAMESPACE } from "@latticexyz/world/src/constants.sol";

address constant worldAddress = 0x1e589d0f5eee235bA1c677fb4F173e052a16f754;
bytes30 constant namespace = bytes30("gm");
bytes14 constant NAMESPACE = bytes14("gm");
ResourceId constant systemId = ResourceId.wrap(
  bytes32(abi.encodePacked(RESOURCE_SYSTEM, NAMESPACE, bytes16("IncrementSystem")))
);