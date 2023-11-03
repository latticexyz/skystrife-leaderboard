// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { System } from "@latticexyz/world/src/System.sol";

import { Combat, Position, PositionData } from "contracts-skystrife/src/codegen/index.sol";

import { Balances, Pilfered, Position as ScavengerPosition, PositionData as ScavengerPositionData } from "../codegen/index.sol";

uint256 constant REWARD = 100;

contract PilferSystem is System {
  function pilfer(bytes32 matchEntity, bytes32 entity) public {
    require(Combat.getHealth(matchEntity, entity) > 0, "Entity is not a unit");
    require(!Pilfered.get(matchEntity, entity), "Entity has already been pilfered");

    ScavengerPositionData memory position = ScavengerPosition.get(matchEntity, _msgSender());
    PositionData memory targetPosition = Position.get(matchEntity, entity);
    require(position.x == targetPosition.x && position.y == targetPosition.y, "You must be on same tile");

    Pilfered.set(matchEntity, entity, true);
    Balances.set(_msgSender(), Balances.get(_msgSender()) + REWARD);
  }
}
