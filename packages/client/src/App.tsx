import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import {
  Has,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { useState } from "react";

const stringToColour = (str: string) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
};

export const App = () => {
  const {
    components: { Position, OwnedBy, StructureType, UnitType },
  } = useMUD();

  const [matchId, setMatchId] = useState(1);

  const units = useEntityQuery([Has(Position)])
    .map((entity) => ({
      entity,
      position: getComponentValueStrict(Position, entity),
      structureType: getComponentValue(StructureType, entity),
      unitType: getComponentValue(UnitType, entity),
      owner: getComponentValue(OwnedBy, entity),
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
      {units.map(({ entity, position, structureType, unitType, owner }) => {
        return (
          <div
            key={entity}
            style={{
              position: "absolute",
              left: 300 + position.x * 20,
              top: 300 + position.y * 20,
              backgroundColor: owner ? stringToColour(owner.value) : "green",
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
