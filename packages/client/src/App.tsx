import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import {
  Has,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import mudConfig from "./mud/skystrife-config/mud.config";

const WIDTH = 30;

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

// TODO: create a mapping between unit types and emojis
export const App = () => {
  const {
    components: { Position, OwnedBy, StructureType, UnitType },
    network: { matchId },
  } = useMUD();

  const units = useEntityQuery([Has(Position)])
    .map((entity) => ({
      entity,
      position: getComponentValueStrict(Position, entity),
      structureType: getComponentValue(StructureType, entity),
      unitType: getComponentValue(UnitType, entity),
      owner: getComponentValue(OwnedBy, entity),
    }))
    .filter(({ position }) => position.z === matchId);

  return (
    <div>
      Match #{matchId}
      {units.map(({ entity, position, structureType, unitType, owner }) => {
        return (
          <div
            key={entity}
            style={{
              position: "absolute",
              left: WIDTH * (15 + position.x),
              top: WIDTH * (15 + position.y),
              width: WIDTH,
              height: WIDTH,
              border: "solid",
              borderWidth: 0.1,
              backgroundColor:
                structureType || unitType
                  ? owner
                    ? stringToColour(owner.value)
                    : "grey"
                  : "green",
            }}
          >
            {structureType
              ? mudConfig.enums.StructureTypes[structureType.value]
              : unitType
              ? mudConfig.enums.UnitTypes[unitType.value]
              : ""}
          </div>
        );
      })}
    </div>
  );
};
