// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";

import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { ResourceId, ResourceIdLib } from "@latticexyz/store/src/ResourceId.sol";
import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";
import { RESOURCE_NAMESPACE } from "@latticexyz/world/src/worldResourceTypes.sol";

import { worldAddress, namespace } from "./constants.sol";

contract RegisterNamespace is Script {
  function run() external {
    StoreSwitch.setStoreAddress(worldAddress);
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    ResourceId namespaceId = ResourceIdLib.encode(
      RESOURCE_NAMESPACE, namespace
    );

    vm.startBroadcast(deployerPrivateKey);
    
    IBaseWorld(worldAddress).registerNamespace(namespaceId);

    vm.stopBroadcast();
  }
}
