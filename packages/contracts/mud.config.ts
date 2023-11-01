import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "gm",
  tables: {
    Counter: {
      keySchema: {},
      valueSchema: "uint32",
    },
  },
});
