import { Entity } from "@latticexyz/recs";
import { Hex, pad } from "viem";

export const addressToEntity = (address: Hex) => pad(
    address
).toLowerCase() as Entity;
