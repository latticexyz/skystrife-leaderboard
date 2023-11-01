// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Script } from "forge-std/Script.sol";

import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";

import { MoveSystem } from "../src/systems/MoveSystem.sol";

import { worldAddress, systemId } from "./constants.sol";

contract RegisterNamespace is Script {
  function run() external {
    StoreSwitch.setStoreAddress(worldAddress);
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    vm.startBroadcast(deployerPrivateKey);

    MoveSystem system = new MoveSystem();

    IBaseWorld(worldAddress).registerSystem(systemId, system, true);
    IBaseWorld(worldAddress).registerFunctionSelector(systemId, "move(uint8)");

    vm.stopBroadcast();
  }
}
