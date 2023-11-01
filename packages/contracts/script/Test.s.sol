// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";

import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { ResourceId, ResourceIdLib } from "@latticexyz/store/src/ResourceId.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";
import { RESOURCE_NAMESPACE } from "@latticexyz/world/src/worldResourceTypes.sol";

import { MatchConfig } from "../src/codegenSkystrife/index.sol";

import { worldAddress, namespace } from "./constants.sol";

bytes32 constant matchEntity = 0x4cd52d8c00000000000000000000000000000000000000000000000000000000;

contract Test is Script {
  function run() external {
    StoreSwitch.setStoreAddress(worldAddress);

    bytes32 levelId = MatchConfig.getLevelId(matchEntity);
    console.log("Level:", vm.toString(levelId));
  }
}
