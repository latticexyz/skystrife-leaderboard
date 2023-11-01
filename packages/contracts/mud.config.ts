import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "scavenger",
  enums: {
    Direction: ["DOWN", "UP", "LEFT", "RIGHT"]
  },
  tables: {
    Position: {
      keySchema: {
        account: "address"
      },
      valueSchema: {
        x: "int32",
        y: "int32"
      }
    },
  },
});
