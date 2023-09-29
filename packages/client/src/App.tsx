import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import {
  Has,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";

const WIDTH = 35;

const UnitTypeToEmoji = [
  "Unknown",
  "🛵",
  "🚚",
  "🚌",
  "🏍️",
  "🏎️",
  "Dragon",
  "🚁",
  "Catapult",
  "Wizard",
];

const TerrainTypeToEmoji = [
  "Unknown",
  "",
  "🏢",
  "",
  "",
  "🌳",
  "",
  "",
  "",
  "",
  "",
  "",
];

const StructureTypeToEmoji = [
  "Unknown",
  "🏠",
  "🏡",
  "GoldShrine",
  "EscapePortal",
  "Portal",
  "Container",
  "SummoningAltar",
  "BlazingHeartShrine",
  "🚧",
  "🏦",
  "Village",
  "EmberCrownShrine",
  "CrystalGenerator",
  "MetalGenerator",
  "FossilGenerator",
  "WidgetGenerator",
];

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
    components: { Position, OwnedBy, StructureType, TerrainType, UnitType },
    network: { matchId },
  } = useMUD();

  const units = useEntityQuery([Has(Position)])
    .map((entity) => ({
      entity,
      position: getComponentValueStrict(Position, entity),
      structureType: getComponentValue(StructureType, entity),
      terrainType: getComponentValue(TerrainType, entity),
      unitType: getComponentValue(UnitType, entity),
      owner: getComponentValue(OwnedBy, entity),
    }))
    .filter(({ position }) => position.z === matchId);

  return (
    <div className="flex justify-center h-screen bg-blue-500 text-2xl">
      Match #{matchId}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {units.map(
          ({
            entity,
            position,
            structureType,
            terrainType,
            unitType,
            owner,
          }) => {
            return (
              <div
                key={entity}
                className="absolute border border-gray-900 text-3xl"
                style={{
                  left: WIDTH * position.x,
                  top: WIDTH * position.y,
                  width: WIDTH,
                  height: WIDTH,
                  backgroundColor:
                    structureType || unitType
                      ? owner
                        ? stringToColour(owner.value)
                        : "grey"
                      : "gray",
                }}
              >
                {structureType
                  ? StructureTypeToEmoji[structureType.value]
                  : terrainType
                  ? TerrainTypeToEmoji[terrainType.value]
                  : unitType
                  ? UnitTypeToEmoji[unitType.value]
                  : ""}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
