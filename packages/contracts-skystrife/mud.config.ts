import { mudConfig, resolveTableId } from "@latticexyz/world/register";

export default mudConfig({
  userTypes: {
    PackedCounter: { filePath: "@latticexyz/store/src/PackedCounter.sol", internalType: "bytes32" },
    ResourceId: { filePath: "@latticexyz/store/src/ResourceId.sol", internalType: "bytes32" },
  },
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
    AttackSystem: {
      openAccess: false,
      accessList: [],
      name: "AttackSystem",
    },
    CombatResultSystem: {
      openAccess: false,
      accessList: [],
      name: "CombatResultSystem",
    },
    FinishSystem: {
      openAccess: false,
      accessList: [],
      name: "FinishSystem",
    },
  },
  tables: {
    // temporarily used in the client for backwards compat while we update frontend
    // this marks entities (eg. units, structures) as being part of the `matchEntity` match
    // TODO: remove
    Match: {
      offchainOnly: true,
      keySchema: {
        matchEntityKey: "bytes32", // same as matchEntity below, but renamed to avoid arg name conflicts in tablegen
        entity: "bytes32",
      },
      valueSchema: {
        matchEntity: "bytes32", // leave this as matchEntity because frontend queries based on this value
      },
    },
    /**
     * Used on terrain to modify the armor of entities standing on it.
     */
    ArmorModifier: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "int32",
    },
    /**
     * Marks an entity as capturable.
     * Instead of dying, they will return to full health
     * and change ownership to the capturer.
     */
    Capturable: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "bool",
    },
    /**
     * The time at which charging started. This is used to determine
     * how much stamina to recharge when refreshing the charged unit in the
     * future.
     * Charger => StartTime
     */
    ChargedByStart: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "uint256",
    },
    /**
     * References the entity that is being charged.
     * Charger => Chargee
     */
    Chargee: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "bytes32",
    },
    Chargers: {
      keySchema: {
        matchEntity: "bytes32",
        chargee: "bytes32",
      },
      valueSchema: {
        chargers: "bytes32[]",
      },
    },
    /**
     * Sets an entity as a charger. The value here is
     * added to the total amount of stamina recharged
     * when the target entity is refreshed.
     */
    Charger: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "int32",
    },
    /**
     * Used to track the total amount of stamina recharged by a Charger.
     * Used to implement depletable Gold Mines.
     */
    ChargeCap: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: {
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
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: {
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
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "int32",
    },
    /**
     * Emitted during combat to inform client animations.
     */
    CombatResult: {
      offchainOnly: true,
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: {
        attacker: "bytes32",
        defender: "bytes32",
        attackerDamageReceived: "int32",
        defenderDamageReceived: "int32",
        attackerDamage: "int32",
        defenderDamage: "int32",
        ranged: "bool",
        attackerDied: "bool",
        defenderDied: "bool",
        defenderCaptured: "bool",
      },
    },
    /**
     * Marks an entity as able to construct other entities.
     */
    Factory: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: {
        prototypeIds: "bytes32[]",
        staminaCosts: "int32[]",
      },
    },
    /**
     * Used to mark something as an Item.
     * NOTE: Only use this to determine if something is an item contract-side.
     * Specific Item Types are only used client-side to deteremine rendering.
     */
    ItemType: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "ItemTypes",
    },
    /**
     * Used in conjuction with Stamina to lazily calculate Stamina regen.
     */
    LastAction: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "uint256",
    },
    /**
     * Used in map creation to mark the center of the map.
     */
    MapCenter: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "bool",
    },
    /**
     * Marks an entity as able to move.
     * The value is how many units there are able to move.
     * Represented in thousands.
     * i.e. 1000 = 1 unit.
     */
    Movable: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "int32",
    },
    /**
     * Given to terrain to determine how much it costs to move onto it.
     * Used in conjunction with Movable during path calculation.
     */
    MoveDifficulty: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "int32",
    },
    /**
     * HEAVILY used to determine ownership chains.
     * i.e. Player -> Unit
     */
    OwnedBy: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "bytes32",
    },
    /**
     * Marks a player address as a player.
     * Value is an incrementing integer.
     */
    Player: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "uint32",
    },
    /**
     * Used in the lobby system to determine if a player is ready.
     */
    PlayerReady: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "uint256",
    },
    /**
     * The position of an entity.
     */
    Position: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: {
        x: "int32",
        y: "int32",
      },
    },
    EntitiesAtPosition: {
      keySchema: {
        matchEntity: "bytes32",
        x: "int32",
        y: "int32",
      },
      valueSchema: {
        entities: "bytes32[]",
      },
    },
    /**
     * The range at which an entity can engage in combat.
     */
    Range: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: {
        min: "int32",
        max: "int32",
      },
    },
    /**
     * Set during Player registration to reserve a specific SpawnPoint in a level for a player entity.
     */
    SpawnReservedBy: {
      keySchema: {
        matchEntity: "bytes32",
        index: "uint256",
      },
      valueSchema: "bytes32",
    },
    /**
     * Marks an entity as a Spawn Point.
     * Players can use it to enter a match.
     */
    SpawnPoint: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "bool",
    },
    /**
     * Stamina is the base resource that everything in the game uses to take actions.
     * It is lazily calculated whenever an entity takes an action.
     * Stamina is regenerated every turn.
     * Used in conjunction with LastAction to lazily calculate Stamina regen.
     */
    Stamina: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: {
        current: "int32",
      },
    },
    /**
     * Used to mark something as an Structure.
     * NOTE: Only use this to determine if something is an Structure contract-side.
     * Specific Structure Types are only used client-side to deteremine rendering.
     */
    StructureType: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "StructureTypes",
    },
    /**
     * Used to mark something as Terrain.
     * NOTE: Only use this to determine if something is Terrain contract-side.
     * Specific Terrain Types are only used client-side to deteremine rendering.
     */
    TerrainType: {
      offchainOnly: true,
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "TerrainTypes",
    },
    /**
     * Used to mark something as a Unit.
     * NOTE: Only use this to determine if something is a Unit contract-side.
     * Specific Unit Types are only used client-side to deteremine rendering.
     */
    UnitType: {
      offchainOnly: true,
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "UnitTypes",
    },
    /**
     * Whethere this entity blocks the movement of other entities.
     */
    Untraversable: {
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "bool",
    },
    Tier: {
      offchainOnly: true,
      keySchema: {
        matchEntity: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "uint32",
    },
    /**
     * Index for finding a player in a given Match.
     */
    MatchPlayer: {
      keySchema: {
        matchEntity: "bytes32",
        playerAddress: "address",
      },
      valueSchema: {
        playerEntity: "bytes32",
      },
    },

    // ______________________ SKYPOOL ____________________________

    /**
     * Stores players chosen names.
     */
    Name: "string",

    /**
     * Marks an entity as an admin. Used on address entities.
     */
    Admin: "bool",

    /**
     * Marks a template as a Hero in the standard rotation.
     */
    HeroInRotation: "bool",
    /**
     * Marks a template as a Hero in the season pass only rotation.
     */
    HeroInSeasonPassRotation: "bool",

    /**
     * Marks an entity as having the season pass.
     */
    SeasonPass: {
      keySchema: {
        account: "address",
      },
      valueSchema: {
        hasSeasonPass: "bool",
      },
    },

    /**
     * SkyPool settings:
     * - Creation cost of SkyPool matches.
     * - Window (in blocks) to determine match rewards.
     * - The entity that holds the SkyPools balance.
     * - Token that is used in SkyPool rewards.
     * - The fraction that each place in the match should win
     */
    SkyPoolConfig: {
      keySchema: {},
      valueSchema: {
        cost: "uint256",
        window: "uint256",
        token: "bytes32",
      },
    },
    /**
     * SkyPool match rewards broken down by
     * the number of players in a match.
     */
    MatchRewardPercentages: {
      keySchema: {
        numPlayers: "uint256",
      },
      valueSchema: {
        percentages: "uint256[]",
      },
    },

    LevelInStandardRotation: {
      keySchema: {
        levelId: "bytes32",
      },
      valueSchema: "bool",
    },

    LevelInSeasonPassRotation: {
      keySchema: {
        levelId: "bytes32",
      },
      valueSchema: "bool",
    },

    LastMatchIndex: {
      keySchema: {},
      valueSchema: {
        matchIndex: "uint32",
      },
    },
    /**
     * Map match entities to their match index (derived from auto-incrementing LastMatchIndex), used in pool rewards
     */
    MatchIndex: {
      keySchema: {
        matchEntity: "bytes32",
      },
      valueSchema: {
        matchIndex: "uint32",
      },
    },
    /**
     * Map match indices to their match entity.
     * Used when calculating rewards for a match to look up matches
     * by their index only.
     */
    MatchIndexToEntity: {
      keySchema: {
        matchIndex: "uint32",
      },
      valueSchema: {
        matchEntity: "bytes32",
      },
    },

    // ______________________ MATCH ____________________________

    /**
     * Counter for match-specific entities, used to derive a bytes32 entity via `encodeMatchEntity`.
     * We'll use this as a fallback in case we don't ship match composite keys in time.
     */
    MatchEntityCounter: {
      keySchema: {
        matchEntity: "bytes32",
      },
      valueSchema: {
        // ~4 billion entities per match seems like plenty for now
        entityCounter: "uint32",
      },
    },
    /**
     * Used to keep track of all the instantiated SpawnPoints in a match.
     */
    MatchSpawnPoints: "bytes32[]",
    /**
     * Kept up to date with all of the player entities present in a Match.
     */
    MatchPlayers: "bytes32[]",
    /**
     * Match data for SkyPool
     */
    MatchSky: {
      valueSchema: {
        createdAt: "uint256",
        reward: "uint256",
      },
    },
    /**
     * Match gameplay settings.
     */
    MatchConfig: {
      valueSchema: {
        startTime: "uint256",
        turnLength: "uint256",
        actionCooldownLength: "uint256",
        levelId: "bytes32",
        createdBy: "bytes32",
      },
    },
    /**
     * Match access control resource and function selector.
     */
    MatchAccessControl: {
      valueSchema: {
        systemId: "ResourceId",
      },
    },
    MatchAllowed: {
      keySchema: {
        matchEntity: "bytes32",
        account: "address",
      },
      valueSchema: "bool",
    },
    /**
     * Whether a match has finished.
     */
    MatchFinished: "bool",
    MatchMapCopyProgress: "uint256",
    /**
     * Time when match Level copying is completed.
     */
    MatchReady: "uint256",
    /**
     * The ordered ranks of each player in the match.
     */
    MatchRanking: {
      valueSchema: "bytes32[]",
    },

    MatchSweepstake: {
      dataStruct: false,
      valueSchema: {
        entranceFee: "uint256",
        rewardPercentages: "uint256[]",
      },
    },

    /**
     * The rewards for each place (1st, 2nd etc...) of match players.
     */
    MatchReward: {
      keySchema: {
        entity: "bytes32",
        rank: "uint256",
      },
      valueSchema: {
        token: "bytes32",
        value: "uint256",
      },
    },

    // ______________________ TEMPLATES + LEVELS ____________________________

    /**
     * Stores the table IDs a template is composed of.
     */
    TemplateTables: "bytes32[]",
    /**
     * Stores the content of each record in a template.
     */
    TemplateContent: {
      dataStruct: false,
      keySchema: {
        templateId: "bytes32",
        tableId: "ResourceId",
      },
      valueSchema: {
        encodedLengths: "PackedCounter",
        staticData: "bytes",
        dynamicData: "bytes",
      },
    },
    /**
     * Stores the template for each index in a level.
     */
    LevelTemplates: "bytes32[]",
    /**
     * Stores the indices of Level entities with a given `templateId`.
     */
    LevelTemplatesIndex: {
      keySchema: {
        levelId: "bytes32",
        templateId: "bytes32",
      },
      valueSchema: "uint256[]",
    },
    /**
     * Stores the table IDs a level entity is composed of.
     */
    LevelTables: {
      keySchema: {
        levelId: "bytes32",
        index: "uint256",
      },
      valueSchema: "bytes32[]",
    },
    /**
     * Stores the content of each record in a level entity.
     */
    LevelContent: {
      dataStruct: false,
      keySchema: {
        levelId: "bytes32",
        index: "uint256",
        tableId: "ResourceId",
      },
      valueSchema: {
        encodedLengths: "PackedCounter",
        staticData: "bytes",
        dynamicData: "bytes",
      },
    },
    /**
     * Stores the indices of Level entities with the given component values.
     */
    LevelContentIndex: {
      keySchema: {
        levelId: "bytes32",
        tableId: "ResourceId",
        encodedLengths: "PackedCounter",
        staticDataHash: "bytes32",
        dynamicDataHash: "bytes32",
      },
      valueSchema: "uint256[]",
    },
    /**
     * Whether a template is "virtual", meaning it is not instantiated during Level copying.
     */
    VirtualLevelTemplates: "bool",

    // ______________________ TOKENS ____________________________

    /**
     * The metadata for each token.
     */
    TokenMetadata: {
      valueSchema: {
        decimals: "uint8",
        name: "string",
        emoji: "string",
      },
    },
    /**
     * The supply for each token.
     */
    TokenSupply: "uint256",
    /**
     * The allowance of each entity for a given token.
     */
    TokenAllowance: {
      keySchema: {
        token: "bytes32",
        account: "bytes32",
        spender: "bytes32",
      },
      valueSchema: "uint256",
    },
    /**
     * The number of tokens owned by each entity for a given token.
     */
    TokenBalance: {
      keySchema: {
        token: "bytes32",
        entity: "bytes32",
      },
      valueSchema: "uint256",
    },
  },
  modules: [
    // KeysWithValueModule
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Name")],
    },
  ],
});
