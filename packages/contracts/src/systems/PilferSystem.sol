// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { PackedCounter } from "@latticexyz/store/src/PackedCounter.sol";

import { Balances, Position as ScavengerPosition, PositionData as ScavengerPositionData, Pilfered } from "../codegen/index.sol";
import { Direction } from "../codegen/common.sol";

import { Position, PositionData } from "../codegenSkystrife/index.sol";

uint256 constant REWARD = 100;

contract PilferSystem is System {
 function pilfer(bytes32 matchEntity, bytes32 entity) public {
  ScavengerPositionData memory position = ScavengerPosition.get(matchEntity, _msgSender());
  PositionData memory targetPosition = Position.get(matchEntity, entity);
  require(position.x == targetPosition.x && position.y == targetPosition.y, "You must be on same tile");
  require(!Pilfered.get(matchEntity, entity), "Entity has already been pilfered");

  Pilfered.set(matchEntity, entity, true);
  Balances.set(_msgSender(), Balances.get(_msgSender()) + REWARD);
 }
}
