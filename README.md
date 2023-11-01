# SkyStrife Leaderboard

## Steps

1. `git clone` this repository.
2. Run `pnpm install` in the base directory to install all dependencies.
3. Run `pnpm dev` to start the client.
4. Go to `localhost:3000`.

## Modifying the client

### Reading tables
Use [RECS](https://mud.dev/client-side) to read the state of tables on the World. All of the Sky Strife tables can be found in the public [MUD config](https://github.com/latticexyz/skystrife-leaderboard/blob/main/packages/client/src/mud/skystrife-config/mud.config.ts). 

**Note:** although all tables are defined on the client, only specific tables are actually hydrated to reduce load times. The client will not warn you and these tables will appear empty. To ensure a table is loaded in the client, add to the `TABLES` array in `setupNetwork`.

### Reading different worlds
To change the default world loaded in the client, update `worlds.json`.

