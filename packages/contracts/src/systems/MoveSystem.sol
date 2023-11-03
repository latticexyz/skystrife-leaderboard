// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { PackedCounter } from "@latticexyz/store/src/PackedCounter.sol";

import { Position, PositionData } from "../codegen/index.sol";
import { Direction } from "../codegen/common.sol";

import { MatchConfig, MoveDifficultyTableId, LevelTemplates, LevelContentIndex, PositionTableId, TemplateContent } from "contracts-skystrife/src/codegen/index.sol";

function getIndicesAtPosition(bytes32 levelId, PositionData memory position) view returns (uint256[] memory) {
  (bytes memory staticData, PackedCounter encodedLengths, bytes memory dynamicData) = Position.encode(
    position.x,
    position.y
  );
  return LevelContentIndex.get(levelId, PositionTableId, encodedLengths, keccak256(staticData), keccak256(dynamicData));
}

contract MoveSystem is System {
  function anyMovementDifficultyAtPosition(bytes32 levelId, PositionData memory position) internal view returns (bool) {
    uint256[] memory indices = getIndicesAtPosition(levelId, position);

    for (uint256 i; i < indices.length; i++) {
      bytes32 templateId = LevelTemplates.getItem(levelId, indices[i]);
      bytes memory staticData = TemplateContent.getStaticData(templateId, MoveDifficultyTableId);

      // Manual MUD decoding
      int32 movementDifficulty = (int32(uint32(Bytes.slice4(staticData, 0))));

      if (movementDifficulty > 0) {
        return true;
      }
    }

    return false;
  }

  function move(bytes32 matchEntity, Direction direction) public {
    bytes32 levelId = MatchConfig.getLevelId(matchEntity);

    PositionData memory position = Position.get(matchEntity, _msgSender());

    if (direction == Direction.DOWN) {
      position.y -= 1;
    } else if (direction == Direction.UP) {
      position.y += 1;
    } else if (direction == Direction.LEFT) {
      position.x -= 1;
    } else {
      position.x += 1;
    }

    require(anyMovementDifficultyAtPosition(levelId, position), "no terrain here");

    Position.set(matchEntity, _msgSender(), position);
  }
}
