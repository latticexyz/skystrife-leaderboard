import { mudConfig, resolveTableId } from "@latticexyz/world/register";

const config = mudConfig({
  enums: {
    UnitTypes: [
      "Unknown",
      "Swordsman",
      "Pikeman",
      "Golem",
      "Rider",
      "Knight",
      "Dragon",
      "Archer",
      "Catapult",
      "Wizard",
    ],
    TerrainTypes: [
      "Unknown",
      "Grass",
      "Mountain",
      "Water",
      "Wall",
      "Forest",
      "StoneWall",
      "LavaGround",
      "LavaMountain",
      "LavaForest",
      "Lava",
      "RockWall",
    ],
    StructureTypes: [
      "Unknown",
      "Settlement",
      "SpawnSettlement",
      "GoldShrine",
      "EscapePortal",
      "Portal",
      "Container",
      "SummoningAltar",
      "BlazingHeartShrine",
      "WoodenWall",
      "GoldMine",
      "Village",
      "EmberCrownShrine",
      "CrystalGenerator",
      "MetalGenerator",
      "FossilGenerator",
      "WidgetGenerator",
    ],
    ItemTypes: [
      "Unknown",
      "Gold",
      "EmberCrown",
      "BlazingHeart",
      "MovementBanner",
      "SwordBanner",
      "StaminaBanner",
      "Crystal",
      "Metal",
      "Fossil",
      "Widget",
    ],
  },
  overrideSystems: {
    /**
     * Utilities for managing player state.
     */
    PlayerSystem: {
      openAccess: false,
      accessList: ["CombatSystem", "PlayerRegisterSystem"],
      name: "PlayerSystem",
    },
    /**
     * Used to increase the Stamina regeneration of an entity
     * by "charging" it with another entity.
     * This is how Gold is implemented.
     * A bunch of Gold Mines "charge" the player.
     */
    ChargeSystem: {
      openAccess: false,
      accessList: ["PlayerSystem"],
      name: "ChargeSystem",
    },
    AttackSystem: {
      openAccess: false,
      accessList: [],
      name: "AttackSystem",
    },
    FinishSystem: {
      openAccess: false,
      accessList: [],
      name: "FinishSystem",
    },
  },
  tables: {
    /**
     * Marks an entity as an admin. Used on address entities.
     */
    Admin: {
      schema: "bool",
    },
    /**
     * Used on terrain to modify the armor of entities standing on it.
     */
    ArmorModifier: {
      schema: "int32",
    },
    /**
     * The address that recieves the rewards of a given player in a match.
     */
    Recipient: {
      schema: "bytes32",
    },
    /**
     * Marks an entity as capturable.
     * Instead of dying, they will return to full health
     * and change ownership to the capturer.
     */
    Capturable: {
      schema: "bool",
    },
    /**
     * Marks an entity as able to capture other entities.
     */
    Capturer: {
      schema: "bool",
    },
    /**
     * The time at which charging started. This is used to determine
     * how much stamina to recharge when refreshing the charged unit in the
     * future.
     * Charger => StartTime
     */
    ChargedByStart: {
      schema: "uint256",
    },
    /**
     * References the entity that is being charged.
     * Charger => Chargee
     */
    Chargee: {
      schema: "bytes32",
    },
    /**
     * Sets an entity as a charger. The value here is
     * added to the total amount of stamina recharged
     * when the target entity is refreshed.
     */
    Charger: {
      schema: "int32",
    },
    /**
     * Used to track the total amount of stamina recharged by a Charger.
     * Used to implement depletable Gold Mines.
     */
    ChargeCap: {
      schema: {
        cap: "int32",
        totalCharged: "int32",
      },
    },
    /**
     * If an entity has this it is able to engage in combat.
     * All values represented in thousands.
     * i.e. 100_000 HP = 100 HP
     */
    Combat: {
      schema: {
        health: "int32",
        maxHealth: "int32",
        armor: "int32",
        strength: "int32",
        structureStrength: "int32",
        counterStrength: "int32",
      },
    },
    /**
     * The amount of Stamina (Gold) a Player receives when killing a unit.
     */
    StaminaOnKill: {
      schema: "int32",
    },
    /**
     * Emitted during combat to inform client animations.
     */
    CombatResult: {
      ephemeral: true,
      schema: {
        attacker: "bytes32",
        defender: "bytes32",
        attackerDamageReceived: "int32",
        defenderDamageReceived: "int32",
        attackerHealth: "int32",
        defenderHealth: "int32",
        attackerDamage: "int32",
        defenderDamage: "int32",
        ranged: "bool",
        attackerDied: "bool",
        defenderDied: "bool",
        defenderCaptured: "bool",
      },
    },
    /**
     * How much stamina it costs an entity to engage in combat.
     */
    CombatCost: {
      schema: "int32",
    },
    /**
     * NOTE: Not currently used.
     * Used to store a combat strength bonus matrix.
     * i.e. Archer bonus vs Swordsman.
     */
    CombatStrength: {
      schema: {
        combatTypeStrengthBonuses: "int32[]",
      },
    },
    /**
     * Used on terrain to give Strength bonuses to any entity staning on it.
     */
    StrengthMod: {
      schema: "int32",
    },
    /**
     * Marks something as an Escape Portal. Can be used in the Escape system.
     */
    EscapePortal: {
      schema: "bool",
    },
    /**
     * Marks an entity as able to construct other entities.
     */
    Factory: {
      schema: {
        prototypeIds: "bytes32[]",
        staminaCosts: "int32[]",
      },
    },
    /**
     * Size of inventory for an entity.
     */
    Inventory: {
      schema: "uint32",
    },
    /**
     * Used to mark something as an Item.
     * NOTE: Only use this to determine if something is an item contract-side.
     * Specific Item Types are only used client-side to deteremine rendering.
     */
    ItemType: {
      schema: "ItemTypes",
    },
    /**
     * How many kills something has.
     */
    KillCount: {
      schema: "uint32",
    },
    /**
     * Used in conjuction with Stamina to lazily calculate Stamina regen.
     */
    LastAction: {
      schema: "uint256",
    },
    /**
     * Match ID.
     * Used to tag entitities as part of a specific match.
     */
    Match: "uint32",
    /**
     * The SpawnPoints that are part of a match.
     * Used as a lookup table to avoid querying all SpawnPoints
     * in all Matches and then filtering.
     */
    MatchSpawnPoints: "bytes32[]",
    /**
     * Match data for SkyPool
     */
    MatchSky: {
      schema: {
        blockNumber: "uint256",
        reward: "uint256",
      },
    },
    /**
     * SkyPool settings:
     * - Creation cost of SkyPool matches.
     * - Scale of rewards for SkyPool matches. The larger the scale, the more rewards.
     * - Window (in blocks) to determine match rewards.
     * - The entity that holds the SkyPools balance.
     * - Token that is used in SkyPool rewards.
     */
    SkyPoolConfig: {
      keySchema: {},
      schema: {
        cost: "uint256",
        window: "uint256",
        entity: "bytes32",
        token: "bytes32",
      },
    },
    /**
     * Match gameplay settings.
     */
    MatchConfig: {
      schema: {
        startTime: "uint256",
        turnLength: "uint256",
        actionCooldownLength: "uint256",
        levelId: "bytes32",
        createdBy: "bytes32",
      },
    },
    /**
     * Whether a match has finished.
     */
    MatchFinished: {
      schema: "bool",
    },
    MatchMapCopyProgress: "uint256",
    /**
     * Time when match was ready for players to join.
     */
    MatchReady: "uint256",
    /**
     * The ordered ranks of each player in the match.
     */
    MatchRanking: {
      schema: "bytes32[]",
    },
    /**
     * The rewards for each place (1st, 2nd etc...) of match players.
     */
    MatchReward: {
      keySchema: {
        entity: "bytes32",
        rank: "uint256",
      },
      schema: {
        token: "bytes32",
        value: "uint256",
      },
    },
    LatestMatch: {
      keySchema: {},
      schema: "uint32",
    },
    /**
     * Marks an entity as able to move.
     * The value is how many units there are able to move.
     * Represented in thousands.
     * i.e. 1000 = 1 unit.
     */
    Movable: {
      schema: "int32",
    },
    /**
     * Given to terrain to determine how much it costs to move onto it.
     * Used in conjunction with Movable during path calculation.
     */
    MoveDifficulty: {
      schema: "int32",
    },
    /**
     * Stores players chosen names.
     */
    Name: {
      schema: "string",
    },
    /**
     * HEAVILY used to determine ownership chains.
     * i.e. Player -> Unit
     */
    OwnedBy: {
      schema: "bytes32",
    },
    /**
     * Marks a player address as a player.
     * Value is an incrementing integer.
     */
    Player: {
      schema: "uint32",
    },
    /**
     * Used in the lobby system to determine if a player is ready.
     */
    PlayerReady: {
      schema: "uint256",
    },
    /**
     * The position of an entity.
     */
    Position: {
      schema: {
        x: "int32",
        y: "int32",
        z: "int32",
      },
    },
    /**
     * Used in templates to store the table IDs a template is composed of.
     */
    Prototype: {
      schema: "bytes32[]",
    },
    /**
     * Used in templates to store the content of each record in a template.
     */
    PrototypeContent: {
      keySchema: {
        templateId: "bytes32",
        tableId: "bytes32",
      },
      schema: "bytes",
    },
    MapSize: {
      keySchema: {
        levelId: "bytes32",
      },
      schema: "uint256",
    },
    MapTemplates: {
      keySchema: {
        levelId: "bytes32",
        indexId: "bytes32",
      },
      schema: "bytes32",
    },
    Map: {
      keySchema: {
        levelId: "bytes32",
        indexId: "bytes32",
      },
      schema: "bytes32[]",
    },
    MapContent: {
      keySchema: {
        levelId: "bytes32",
        indexId: "bytes32",
        tableId: "bytes32",
      },
      schema: "bytes",
    },
    /**
     * The range at which an entity can engage in combat.
     */
    Range: {
      schema: {
        min: "int32",
        max: "int32",
      },
    },
    /**
     * Set during Player registration to reserve a specific SpawnPoint for a player entity.
     */
    SpawnReservedBy: {
      schema: "bytes32",
    },
    /**
     * Makes an entity able to spawn a resource.
     * Value is the prototype ID of the resource.
     */
    ResourceSpawn: {
      schema: "bytes32",
    },
    /**
     * Given to a Player entity when they spawn into a match.
     */
    Spawned: {
      schema: "bool",
    },
    /**
     * Marks an entity as a Spawn Point.
     * Players can use it to enter a match.
     */
    SpawnPoint: {
      schema: "bool",
    },
    /**
     * Stamina is the base resource that everything in the game uses to take actions.
     * It is lazily calculated whenever an entity takes an action.
     * Stamina is regenerated every turn.
     * Used in conjunction with LastAction to lazily calculate Stamina regen.
     */
    Stamina: {
      schema: {
        current: "int32",
        max: "int32",
        regeneration: "int32",
      },
    },
    /**
     * How much Stamina an entity can regenerate in its lifetime.
     */
    StamRegenCap: {
      schema: {
        totalRegenerated: "int32",
        cap: "int32",
      },
    },
    /**
     * Used to mark something as an Structure.
     * NOTE: Only use this to determine if something is an Structure contract-side.
     * Specific Structure Types are only used client-side to deteremine rendering.
     */
    StructureType: {
      schema: "StructureTypes",
    },
    /**
     * Used to mark something as Terrain.
     * NOTE: Only use this to determine if something is Terrain contract-side.
     * Specific Terrain Types are only used client-side to deteremine rendering.
     */
    TerrainType: {
      schema: "TerrainTypes",
    },
    /**
     * Used to mark something as a Unit.
     * NOTE: Only use this to determine if something is a Unit contract-side.
     * Specific Unit Types are only used client-side to deteremine rendering.
     */
    UnitType: {
      schema: "UnitTypes",
    },
    /**
     * The metadata for each token.
     */
    TokenMetadata: {
      schema: {
        name: "string",
        emoji: "string",
      },
    },
    /**
     * The number of tokens owned by each entity for a given token.
     */
    TokenBalance: {
      keySchema: {
        token: "bytes32",
        entity: "bytes32",
      },
      schema: "uint256",
    },
    /**
     * Whethere this entity blocks the movement of other entities.
     */
    Untraversable: {
      schema: "bool",
    },
    Tier: "uint32",
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
    },

    // KeysWithValueModule
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("OwnedBy")],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Position")],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Chargee")],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Charger")],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Match")],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("SpawnReservedBy")],
    },

    // KeysInTableModule
    {
      name: "KeysInTableModule",
      root: true,
      args: [resolveTableId("Player")],
    },
    {
      name: "KeysInTableModule",
      root: true,
      args: [resolveTableId("PlayerReady")],
    },
    {
      name: "KeysInTableModule",
      root: true,
      args: [resolveTableId("SpawnPoint")],
    },
    {
      name: "KeysInTableModule",
      root: true,
      args: [resolveTableId("OwnedBy")],
    },
    {
      name: "KeysInTableModule",
      root: true,
      args: [resolveTableId("MatchSky")],
    },
  ],
});

export default config;
