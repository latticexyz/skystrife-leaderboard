// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Script } from "forge-std/Script.sol";

import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";

import { MoveSystem } from "../src/systems/MoveSystem.sol";
import { PilferSystem } from "../src/systems/PilferSystem.sol";

import { worldAddress, moveSystemId, pilferSystemId } from "./constants.sol";

contract RegisterNamespace is Script {
  function run() external {
    StoreSwitch.setStoreAddress(worldAddress);
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    vm.startBroadcast(deployerPrivateKey);

    {
      MoveSystem system = new MoveSystem();
      IBaseWorld(worldAddress).registerSystem(moveSystemId, system, true);
      IBaseWorld(worldAddress).registerFunctionSelector(moveSystemId, "move(bytes32,uint8)");
    }

    {
      PilferSystem system = new PilferSystem();
      IBaseWorld(worldAddress).registerSystem(pilferSystemId, system, true);
      IBaseWorld(worldAddress).registerFunctionSelector(pilferSystemId, "pilfer(bytes32,bytes32)");
    }

    vm.stopBroadcast();
  }
}
