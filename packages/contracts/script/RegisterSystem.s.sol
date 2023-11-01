// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";

import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { ResourceId, WorldResourceIdLib, WorldResourceIdInstance } from "@latticexyz/world/src/WorldResourceId.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";

import { IncrementSystem } from "../src/systems/IncrementSystem.sol";
import {Counter} from "../src/codegen/index.sol";

import { worldAddress, systemId } from "./constants.sol";

contract RegisterNamespace is Script {
  function run() external {
    StoreSwitch.setStoreAddress(worldAddress);
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    
    vm.startBroadcast(deployerPrivateKey);
    
    IncrementSystem system = new IncrementSystem();
    IBaseWorld(worldAddress).registerSystem(systemId, system, true);

    vm.stopBroadcast();
  }
}
