import { decodeValue } from "@latticexyz/protocol-parser";
import { useMUD } from "./MUDContext";
import { Hex } from "viem";
import { useEffect } from "react";
import { toEthAddress } from "@latticexyz/utils";

const BYTES32_ZERO =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const MATCH_ENTITY =
  "0x4cd52d8c00000000000000000000000000000000000000000000000000000000";
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

const Unit = ({
  keyObject,
}: {
  keyObject: { matchEntity: Hex; entity: Hex };
}) => {
  const {
    network: { tables, useStore },
  } = useMUD();

  const position = useStore((state) =>
    state.getRecord(tables.Position, keyObject)
  );
  const structureType = useStore((state) =>
    state.getRecord(tables.StructureType, keyObject)
  );
  const player = useStore((state) =>
    state.getRecord(tables.OwnedBy, keyObject)
  );
  const owner = useStore((state) =>
    state.getRecord(tables.OwnedBy, {
      matchEntity: MATCH_ENTITY,
      entity: player ? player.value.value : BYTES32_ZERO,
    })
  );
  const pilfered = useStore((state) =>
    state.getRecord(tables.Pilfered, keyObject)
  );

  const backgroundColor = owner ? `#${owner.value.value.slice(-6)}` : "gray";

  return position ? (
    <div
      className="absolute border border-gray-900 text-3xl"
      style={{
        left: WIDTH * position.value.x,
        top: WIDTH * position.value.y,
        width: WIDTH,
        height: WIDTH,
        backgroundColor,
        opacity: pilfered ? "50%" : "100%",
      }}
    >
      {structureType ? StructureTypeToSymbol[structureType.value.value] : "🧙"}
    </div>
  ) : null;
};

const Scavenger = ({
  keyObject,
}: {
  keyObject: { matchEntity: Hex; account: Hex };
}) => {
  const {
    network: { tables, useStore, walletClient },
  } = useMUD();

  const position = useStore((state) =>
    state.getRecord(tables.ScavengerPosition, keyObject)
  );
  const backgroundColor =
    toEthAddress(keyObject.account) ===
    walletClient.account.address.toLowerCase()
      ? "gold"
      : "blue";

  return position ? (
    <div
      className="absolute border border-gray-900 bg-red-600 rounded-2xl"
      style={{
        left: WIDTH * position.value.x,
        top: WIDTH * position.value.y,
        width: WIDTH,
        height: WIDTH,
        backgroundColor,
      }}
    />
  ) : null;
};

export const App = () => {
  const {
    network: { tables, useStore, walletClient, worldContract },
  } = useMUD();

  const config = useStore((state) =>
    state.getRecord(tables.MatchConfig, { key: MATCH_ENTITY })
  );
  const balance = useStore((state) =>
    state.getRecord(tables.ScavengerBalances, {
      account: walletClient.account.address,
    })
  );

  const terrain = useStore((state) =>
    Object.values(state.getRecords(tables.LevelContent))
      .filter((record) => config && record.key.levelId === config.value.levelId)
      .map((record) => {
        return decodeValue(
          { x: "int32", y: "int32" },
          record.value.staticData as Hex
        );
      })
  );

  const units = useStore((state) =>
    Object.values(state.getRecords(tables.Position)).filter(
      (record) => record.key.matchEntity === MATCH_ENTITY
    )
  );

  const scavengers = useStore((state) =>
    Object.values(state.getRecords(tables.ScavengerPosition)).filter(
      (record) => record.key.matchEntity === MATCH_ENTITY
    )
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "KeyS") {
        worldContract.write.mangos_MoveSystem_move([MATCH_ENTITY as Hex, 1]);
      } else if (event.code === "KeyW") {
        worldContract.write.mangos_MoveSystem_move([MATCH_ENTITY as Hex, 0]);
      } else if (event.code === "KeyA") {
        worldContract.write.mangos_MoveSystem_move([MATCH_ENTITY as Hex, 2]);
      } else if (event.code === "KeyD") {
        worldContract.write.mangos_MoveSystem_move([MATCH_ENTITY as Hex, 3]);
      } else if (event.code === "KeyE") {
        const playerPosition = useStore
          .getState()
          .getRecord(tables.ScavengerPosition, {
            matchEntity: MATCH_ENTITY,
            account: walletClient.account.address,
          });

        if (playerPosition) {
          const entitiesAtPosition = Object.values(
            useStore.getState().getRecords(tables.Position)
          ).filter(
            (record) =>
              record.key.matchEntity === MATCH_ENTITY &&
              record.value.x === playerPosition?.value.x &&
              record.value.y === playerPosition?.value.y
          );

          if (entitiesAtPosition.length > 0) {
            const { matchEntity, entity } = entitiesAtPosition[0].key;
            worldContract.write.mangos_PilferSystem_pilfer([
              matchEntity,
              entity,
            ]);
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    tables.Position,
    tables.ScavengerPosition,
    useStore,
    walletClient.account.address,
    worldContract.write,
  ]);

  return (
    <div className="flex justify-center h-screen bg-blue-500 text-lg">
      <div className="flex flex-col">
        <div>Match #{MATCH_ENTITY}</div>
        <div>Balance: {balance ? balance.value.value.toString() : "0"} ⚙️</div>
        <div>
          Press <b>WASD</b> to move. Press <b>E</b> to pilfer a unit when you
          are on their tile. Pilfering can only be done once per unit and gives
          you ⚙️.
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {terrain.map((value, i) => {
          return (
            <div
              key={i}
              className="absolute border border-gray-900 text-3xl bg-green-600"
              style={{
                left: WIDTH * value.x,
                top: WIDTH * value.y,
                width: WIDTH,
                height: WIDTH,
              }}
            />
          );
        })}
        {Object.values(units).map((record) => (
          <Unit key={record.id} keyObject={record.key} />
        ))}
        {Object.values(scavengers).map((record) => (
          <Scavenger key={record.id} keyObject={record.key} />
        ))}
      </div>
    </div>
  );
};
