import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import {
  Has,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { useState } from "react";

export const App = () => {
  const {
    components: { Position, StructureType, UnitType },
  } = useMUD();

  const [matchId, setMatchId] = useState(1);

  const units = useEntityQuery([Has(Position)])
    .map((entity) => ({
      entity,
      position: getComponentValueStrict(Position, entity),
      structureType: getComponentValue(StructureType, entity),
      unitType: getComponentValue(UnitType, entity),
    }))
    .filter(({ position }) => {
      return position.z === matchId;
    });

  return (
    <div>
      Match ID:
      <input
        value={matchId}
        onChange={(e) => setMatchId(parseInt(e.target.value))}
        type="number"
      />
      {units.map(({ entity, position, structureType, unitType }) => {
        return (
          <div
            key={entity}
            style={{
              position: "absolute",
              left: 300 + position.x * 20,
              top: 300 + position.y * 20,
              backgroundColor: unitType
                ? "red"
                : structureType
                ? "grey"
                : "green",
              width: 20,
            }}
          >
            {structureType ? "O" : unitType ? "X" : "_"}
          </div>
        );
      })}
    </div>
  );
};
