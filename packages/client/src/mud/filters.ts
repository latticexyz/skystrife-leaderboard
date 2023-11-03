import { resourceToHex } from "@latticexyz/common";
import { SyncFilter } from "@latticexyz/store-sync";

import mudConfig from "contracts/mud.config";
import skystrifeConfig from "contracts-skystrife/mud.config";
import { Hex } from "viem";

export const FILTERS_HOME: SyncFilter[] = [
    {
        tableId: resourceToHex({
            type: "table",
            namespace: skystrifeConfig.namespace,
            name: "MatchConfig",
        }),
    }, {
        tableId: resourceToHex({
            type: "table",
            namespace: skystrifeConfig.namespace,
            name: "MatchIndex",
        }),
    },
];

export const FILTERS_LEADERBOARD: SyncFilter[] = [
    {
        tableId: resourceToHex({
            type: "table",
            namespace: mudConfig.namespace,
            name: "Balances",
        }),
    },
];

export const getFiltersMatch = (matchEntity: Hex): SyncFilter[] => [
    // Root tables
    {
        tableId: resourceToHex({
            type: "table",
            namespace: skystrifeConfig.namespace,
            name: "MatchConfig",
        }),
    },
    {
        tableId: resourceToHex({
            type: "table",
            namespace: skystrifeConfig.namespace,
            name: "LevelContent",
        }),
    },
    {
        tableId: resourceToHex({
            type: "table",
            namespace: skystrifeConfig.namespace,
            name: "Position",
        }),
        key0: matchEntity,
    },
    {
        tableId: resourceToHex({
            type: "table",
            namespace: skystrifeConfig.namespace,
            name: "OwnedBy",
        }),
        key0: matchEntity,
    },
    {
        tableId: resourceToHex({
            type: "table",
            namespace: skystrifeConfig.namespace,
            name: "StructureType",
        }),
        key0: matchEntity,
    },
    // Sky Scavenger tables
    {
        tableId: resourceToHex({
            type: "table",
            namespace: mudConfig.namespace,
            name: "Balances",
        }),
    },
    {
        tableId: resourceToHex({
            type: "table",
            namespace: mudConfig.namespace,
            name: "Position",
        }),
        key0: matchEntity,
    },
    {
        tableId: resourceToHex({
            type: "table",
            namespace: mudConfig.namespace,
            name: "Pilfered",
        }),
        key0: matchEntity,
    },
];