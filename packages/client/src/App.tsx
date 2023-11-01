import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import {
  Entity,
  Has,
  HasValue,
  getComponentValue,
  getComponentValueStrict,
  runQuery,
} from "@latticexyz/recs";
import { decodeValue } from "@latticexyz/protocol-parser";
import { decodeEntity } from "@latticexyz/store-sync/recs";
import { useMUD } from "./MUDContext";
import { Hex, pad } from "viem";
import { useEffect } from "react";
import { decodeMatchEntity } from "./decodeMatchEntity";
import { encodeMatchEntity } from "./encodeMatchEntity";
import { toEthAddress } from "@latticexyz/utils";

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

const Unit = ({ entity }: { entity: Entity }) => {
  const {
    components: { OwnedBy, Position, StructureType, Pilfered },
  } = useMUD();

  const position = useComponentValue(Position, entity);
  const structureType = useComponentValue(StructureType, entity);
  const player = useComponentValue(OwnedBy, entity);
  const owner = player
    ? getComponentValue(
        OwnedBy,
        encodeMatchEntity(MATCH_ENTITY, player.value as Entity)
      )
    : null;
  const pilfered = useComponentValue(Pilfered, entity);

  const backgroundColor = owner ? `#${owner.value.slice(-6)}` : "gray";

  return position ? (
    <div
      key={entity}
      className="absolute border border-gray-900 text-3xl"
      style={{
        left: WIDTH * position.x,
        top: WIDTH * position.y,
        width: WIDTH,
        height: WIDTH,
        backgroundColor,
        opacity: pilfered ? "50%" : "100%",
      }}
    >
      {structureType ? StructureTypeToSymbol[structureType.value] : "🧙"}
    </div>
  ) : null;
};

export const App = () => {
  const {
    network: { walletClient, worldContract },
    components: { MatchConfig, LevelContent, Position, ScavengerPosition },
  } = useMUD();

  const config = useComponentValue(MatchConfig, MATCH_ENTITY);

  const units = useEntityQuery([Has(Position)]).filter((entity) => {
    const { matchEntity } = decodeEntity(Position.metadata.keySchema, entity);
    return matchEntity === MATCH_ENTITY;
  });

  const terrain = useEntityQuery([Has(LevelContent)])
    .filter((entity) => {
      const { levelId } = decodeEntity(LevelContent.metadata.keySchema, entity);

      return config && levelId === config.levelId;
    })
    .map((entity) => {
      const { staticData } = getComponentValueStrict(LevelContent, entity);

      return decodeValue(Position.metadata.valueSchema, staticData as Hex);
    });

  const scavengers = useEntityQuery([Has(ScavengerPosition)])
    .filter((entity) => {
      const { matchEntity } = decodeEntity(
        ScavengerPosition.metadata.keySchema,
        entity
      );
      return matchEntity === MATCH_ENTITY;
    })
    .map((entity) => ({
      entity,
      position: getComponentValueStrict(ScavengerPosition, entity),
    }));

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "KeyS") {
        worldContract.write.batman4_MoveSystem_move([MATCH_ENTITY, 1]);
      } else if (event.code === "KeyW") {
        worldContract.write.batman4_MoveSystem_move([MATCH_ENTITY, 0]);
      } else if (event.code === "KeyA") {
        worldContract.write.batman4_MoveSystem_move([MATCH_ENTITY, 2]);
      } else if (event.code === "KeyD") {
        worldContract.write.batman4_MoveSystem_move([MATCH_ENTITY, 3]);
      } else if (event.code === "KeyE") {
        const playerPosition = getComponentValueStrict(
          ScavengerPosition,
          encodeMatchEntity(
            MATCH_ENTITY,
            pad(walletClient.account.address).toLowerCase() as Entity
          )
        );

        const entitiesAtPosition = Array.from(
          runQuery([HasValue(Position, playerPosition)])
        );
        if (entitiesAtPosition.length > 0) {
          worldContract.write
            .batman4_PilferSystem_pilfer([
              MATCH_ENTITY,
              decodeMatchEntity(entitiesAtPosition[0]).entity,
            ])
            .then(console.log);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    Position,
    ScavengerPosition,
    walletClient.account.address,
    worldContract.write,
  ]);

  return (
    <div className="flex justify-center h-screen bg-blue-500 text-lg">
      <div>Match #{MATCH_ENTITY}</div>
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
        {units.map((entity) => (
          <Unit key={entity} entity={entity} />
        ))}

        {scavengers.map(({ entity, position }, i) => {
          const backgroundColor =
            toEthAddress(entity) === walletClient.account.address.toLowerCase()
              ? "gold"
              : "blue";

          return (
            <div
              key={i}
              className="absolute border border-gray-900 bg-red-600 rounded-2xl"
              style={{
                left: WIDTH * position.x,
                top: WIDTH * position.y,
                width: WIDTH,
                height: WIDTH,
                backgroundColor,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
