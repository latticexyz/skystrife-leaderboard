import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "bananas",
  enums: {
    Direction: ["DOWN", "UP", "LEFT", "RIGHT"]
  },
  tables: {
    Position: {
      keySchema: {
        matchEntity: "bytes32",
        account: "address"
      },
      valueSchema: {
        x: "int32",
        y: "int32"
      }
    },
    Pilfered: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32"
      },
      valueSchema: {
        value: "bool"
      }
    },
    Balances: {
      keySchema: {
        account: "address"
      },
      valueSchema: {
        value: "uint256"
      }
    },
  },
});
