// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { PackedCounter } from "@latticexyz/store/src/PackedCounter.sol";

import { Position, PositionData } from "../codegen/index.sol";
import { Direction } from "../codegen/common.sol";

import { MatchConfig, MoveDifficultyTableId, TemplateContent, LevelTemplates, LevelContentIndex, PositionTableId } from "../codegenSkystrife/index.sol";

function getIndicesAtPosition(bytes32 levelId, PositionData memory position) view returns (uint256[] memory) {
  (bytes memory staticData, PackedCounter encodedLengths, bytes memory dynamicData) = Position.encode(
    position.x,
    position.y
  );
  return LevelContentIndex.get(levelId, PositionTableId, encodedLengths, keccak256(staticData), keccak256(dynamicData));
}

contract MoveSystem is System {
  function getMovementDifficultyAtPosition(
    bytes32 levelId,
    PositionData memory position
  ) internal view returns (int32 movementDifficulty) {
    uint256[] memory indices = getIndicesAtPosition(levelId, position);

    for (uint256 i; i < indices.length; i++) {
      bytes32 templateId = LevelTemplates.getItem(levelId, indices[i]);
      bytes memory staticData = TemplateContent.getStaticData(templateId, MoveDifficultyTableId);

      // Manual MUD decoding
      movementDifficulty += (int32(uint32(Bytes.slice4(staticData, 0))));
    }
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

    int32 movementDifficulty = getMovementDifficultyAtPosition(levelId, position);
    require(movementDifficulty > 0, "no terrain here");

    Position.set(matchEntity, _msgSender(), position);
  }
}
