import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import {
  Entity,
  Has,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { decodeValue } from "@latticexyz/protocol-parser";
import { decodeEntity, singletonEntity } from "@latticexyz/store-sync/recs";
import { useMUD } from "./MUDContext";
import { Hex } from "viem";
import { stringToColour } from "./stringToColor";

const MATCH_ENTITY =
  "0x4cd52d8c00000000000000000000000000000000000000000000000000000000" as Entity;
const WIDTH = 35;

const StructureTypeToSymbol = [
  "Unknown",
  "🏠",
  "🏰",
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

export const App = () => {
  const {
    network: { worldContract },
    components: {
      Counter,
      OwnedBy,
      MatchConfig,
      LevelContent,
      Position,
      StructureType,
    },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  const config = useComponentValue(MatchConfig, MATCH_ENTITY);

  const units = useEntityQuery([Has(Position)])
    .filter((entity) => {
      const { matchEntity } = decodeEntity(Position.metadata.keySchema, entity);
      return matchEntity === MATCH_ENTITY;
    })
    .map((entity) => ({
      entity,
      position: getComponentValueStrict(Position, entity),
      structureType: getComponentValue(StructureType, entity),
      owner: getComponentValue(OwnedBy, entity),
    }));

  const terrain = useEntityQuery([Has(LevelContent)])
    .filter((entity) => {
      const { levelId } = decodeEntity(LevelContent.metadata.keySchema, entity);

      return config && levelId === config.levelId;
    })
    .map((entity) => {
      const { staticData } = getComponentValueStrict(LevelContent, entity);

      return decodeValue(Position.metadata.valueSchema, staticData as Hex);
    });

  return (
    <div className="flex justify-center h-screen bg-blue-500 text-lg">
      <div>Match #{MATCH_ENTITY}</div>
      <div>
        <button
          onClick={() => {
            worldContract.write
              .gm_IncrementSystem_increment()
              .then(console.log);
          }}
        >
          gm
        </button>
        <div>{counter ? counter.value : "n"}</div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {terrain.map((position, i) => {
          return (
            <div
              key={i}
              className="absolute border border-gray-900 text-3xl bg-green-600"
              style={{
                left: WIDTH * position.x,
                top: WIDTH * position.y,
                width: WIDTH,
                height: WIDTH,
              }}
            />
          );
        })}
        {units.map(({ position, structureType, owner }, i) => {
          return (
            <div
              key={i}
              className="absolute border border-gray-900 text-3xl bg-red-600"
              style={{
                left: WIDTH * position.x,
                top: WIDTH * position.y,
                width: WIDTH,
                height: WIDTH,
                backgroundColor: owner ? stringToColour(owner.value) : "gray",
              }}
            >
              {structureType
                ? StructureTypeToSymbol[structureType.value]
                : "🧙"}
            </div>
          );
        })}
      </div>
    </div>
  );
};
