// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { System } from "@latticexyz/world/src/System.sol";
import { Position, PositionData } from "../codegen/index.sol";
import { Direction } from "../codegen/common.sol";

contract MoveSystem is System {
  function move(bytes32 matchEntity, Direction direction) public {
    PositionData memory position = Position.get(matchEntity, _msgSender());

    if (direction == Direction.DOWN) {
      Position.setY(matchEntity, _msgSender(), position.y - 1);
    } else if (direction == Direction.UP) {
      Position.setY(matchEntity, _msgSender(), position.y + 1);
    } else if (direction == Direction.LEFT) {
      Position.setX(matchEntity, _msgSender(), position.x - 1);
    } else {
      Position.setX(matchEntity, _msgSender(), position.x + 1);
    }
  }
}
