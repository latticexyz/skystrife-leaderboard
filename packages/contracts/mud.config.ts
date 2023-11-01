import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "batman1",
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
  },
});
