import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import {
  Has,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Edges, OrbitControls } from "@react-three/drei";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";

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

function Box(props: ThreeElements["mesh"] & { color: string }) {
  const { color } = props;

  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "black" : color} />
      <Edges scale={1} color="black" />
    </mesh>
  );
}

const Gm = () => {
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
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {units.map(({ entity, owner, position, structureType, unitType }) => (
        <Box
          key={entity}
          color={
            structureType || unitType
              ? owner
                ? stringToColour(owner.value)
                : "grey"
              : "#59A608"
          }
          position={[position.x, structureType || unitType ? 1 : 0, position.y]}
        />
      ))}
    </>
  );
};
export const App = () => {
  const {
    network: { matchId },
  } = useMUD();

  return (
    <div className="flex justify-center h-screen bg-blue-500 text-2xl">
      Match #{matchId}
      <VRButton />
      <Canvas camera={{ position: [0, 0, 3] }}>
        <XR>
          <Controllers />
          <Hands />
          <Gm />
        </XR>
      </Canvas>
      ,
    </div>
  );
};
