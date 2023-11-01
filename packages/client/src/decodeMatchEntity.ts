import { Entity } from "@latticexyz/recs";
import { decodeEntity } from "@latticexyz/store-sync/recs";
import { Hex, isHex, size } from "viem";

export const BYTES32_ZERO = "0x0000000000000000000000000000000000000000000000000000000000000000";

export function decodeMatchEntity(entity: Entity | Hex | null | undefined) {
  if (entity == null) return { matchEntity: BYTES32_ZERO, entity: BYTES32_ZERO } as const;
  if (isHex(entity) && size(entity) === 32) return { matchEntity: BYTES32_ZERO, entity } as const;
  return decodeEntity({ matchEntity: "bytes32", entity: "bytes32" }, entity as Entity);
}
