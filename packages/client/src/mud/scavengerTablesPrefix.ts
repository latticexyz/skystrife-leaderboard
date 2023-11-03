import { resolveConfig } from "@latticexyz/store";
import mudConfig from "contracts/mud.config";

const NAMESPACE = "Scavenger";

const { tables } = resolveConfig(mudConfig);

type ResolvedTablesPrefix = {
    [Property in keyof typeof tables as `${typeof NAMESPACE}_${string & Property}`]: typeof tables[Property]
};

export const tablesPrefix: ResolvedTablesPrefix = {
    [`${NAMESPACE}_Pilfered`]: tables.Pilfered,
    [`${NAMESPACE}_Position`]: tables.Position,
    [`${NAMESPACE}_Balances`]: tables.Balances,
};