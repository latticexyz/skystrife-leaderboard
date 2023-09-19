declare const abi: [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "resource",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "AccessDenied",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "delegator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "delegatee",
        "type": "address"
      }
    ],
    "name": "DelegationNotFound",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "functionSelector",
        "type": "bytes4"
      }
    ],
    "name": "FunctionSelectorExists",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "functionSelector",
        "type": "bytes4"
      }
    ],
    "name": "FunctionSelectorNotFound",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "InterfaceNotSupported",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "resource",
        "type": "string"
      }
    ],
    "name": "InvalidSelector",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "resource",
        "type": "string"
      }
    ],
    "name": "ResourceExists",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "resource",
        "type": "string"
      }
    ],
    "name": "ResourceNotFound",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "length",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "received",
        "type": "uint256"
      }
    ],
    "name": "StoreCore_DataIndexOverflow",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "expected",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "received",
        "type": "uint256"
      }
    ],
    "name": "StoreCore_InvalidDataLength",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "expected",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "received",
        "type": "uint256"
      }
    ],
    "name": "StoreCore_InvalidFieldNamesLength",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "expected",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "received",
        "type": "uint256"
      }
    ],
    "name": "StoreCore_InvalidKeyNamesLength",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "expected",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "received",
        "type": "uint256"
      }
    ],
    "name": "StoreCore_InvalidValueSchemaLength",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "StoreCore_NotDynamicField",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "StoreCore_NotImplemented",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "tableId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "tableIdString",
        "type": "string"
      }
    ],
    "name": "StoreCore_TableAlreadyExists",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "tableId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "tableIdString",
        "type": "string"
      }
    ],
    "name": "StoreCore_TableNotFound",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "system",
        "type": "address"
      }
    ],
    "name": "SystemExists",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WorldAlreadyInitialized",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "HelloWorld",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      }
    ],
    "name": "StoreDeleteRecord",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "StoreEphemeralRecord",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "schemaIndex",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "StoreSetField",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "StoreSetRecord",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "token",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "spender",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "attacker",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "defender",
        "type": "bytes32"
      }
    ],
    "name": "attack",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "resourceSelectors",
        "type": "bytes32[]"
      },
      {
        "internalType": "bytes[]",
        "name": "funcSelectorAndArgs",
        "type": "bytes[]"
      }
    ],
    "name": "batchCall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "factoryEntity",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "prototypeId",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "int32",
            "name": "x",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "y",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "z",
            "type": "int32"
          }
        ],
        "internalType": "struct PositionData",
        "name": "coord",
        "type": "tuple"
      }
    ],
    "name": "build",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "funcSelectorAndArgs",
        "type": "bytes"
      }
    ],
    "name": "call",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "delegator",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "funcSelectorAndArgs",
        "type": "bytes"
      }
    ],
    "name": "callFrom",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "charger",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "target",
        "type": "bytes32"
      }
    ],
    "name": "charge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      }
    ],
    "name": "copyMap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "attacker",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "defender",
        "type": "bytes32"
      },
      {
        "internalType": "int32",
        "name": "defenderDamage",
        "type": "int32"
      }
    ],
    "name": "counterattack",
    "outputs": [
      {
        "internalType": "bool",
        "name": "attackerDied",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "levelId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "bytes4",
        "name": "funcSelector",
        "type": "bytes4"
      }
    ],
    "name": "createMatch",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "levelId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "bytes4",
        "name": "funcSelector",
        "type": "bytes4"
      },
      {
        "internalType": "bytes",
        "name": "preimage",
        "type": "bytes"
      }
    ],
    "name": "createMatchWithPreimage",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "playerAddress",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "matchId",
        "type": "uint32"
      }
    ],
    "name": "createPlayerEntity",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "creator",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "deleteRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      }
    ],
    "name": "destroyMatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "emitEphemeralRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "attacker",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "defender",
        "type": "bytes32"
      }
    ],
    "name": "fight",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "loser",
        "type": "bytes32"
      }
    ],
    "name": "finish",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint8",
        "name": "schemaIndex",
        "type": "uint8"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "getField",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      }
    ],
    "name": "getFieldLayout",
    "outputs": [
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint8",
        "name": "schemaIndex",
        "type": "uint8"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "getFieldLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint8",
        "name": "schemaIndex",
        "type": "uint8"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "end",
        "type": "uint256"
      }
    ],
    "name": "getFieldSlice",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      }
    ],
    "name": "getKeySchema",
    "outputs": [
      {
        "internalType": "Schema",
        "name": "schema",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "getRecord",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      }
    ],
    "name": "getValueSchema",
    "outputs": [
      {
        "internalType": "Schema",
        "name": "schema",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "grantee",
        "type": "address"
      }
    ],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IModule",
        "name": "coreModule",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IModule",
        "name": "module",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "args",
        "type": "bytes"
      }
    ],
    "name": "installModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IModule",
        "name": "module",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "args",
        "type": "bytes"
      }
    ],
    "name": "installRootModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isAllowed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isMember",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "entity",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "int32",
            "name": "x",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "y",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "z",
            "type": "int32"
          }
        ],
        "internalType": "struct PositionData[]",
        "name": "path",
        "type": "tuple[]"
      }
    ],
    "name": "move",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "entity",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "int32",
            "name": "x",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "y",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "z",
            "type": "int32"
          }
        ],
        "internalType": "struct PositionData[]",
        "name": "path",
        "type": "tuple[]"
      },
      {
        "internalType": "bytes32",
        "name": "target",
        "type": "bytes32"
      }
    ],
    "name": "moveAndAttack",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint8",
        "name": "schemaIndex",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "byteLengthToPop",
        "type": "uint256"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "popFromField",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint8",
        "name": "schemaIndex",
        "type": "uint8"
      },
      {
        "internalType": "bytes",
        "name": "dataToPush",
        "type": "bytes"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "pushToField",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "spawnPoint",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "register",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "register",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "player",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "spawnPoint",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "register",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "player",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "delegatee",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "delegationControlId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "initFuncSelectorAndArgs",
        "type": "bytes"
      }
    ],
    "name": "registerDelegation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "systemFunctionName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "systemFunctionArguments",
        "type": "string"
      }
    ],
    "name": "registerFunctionSelector",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "worldFunctionSelector",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes16",
        "name": "namespace",
        "type": "bytes16"
      }
    ],
    "name": "registerNamespace",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "bytes4",
        "name": "worldFunctionSelector",
        "type": "bytes4"
      },
      {
        "internalType": "bytes4",
        "name": "systemFunctionSelector",
        "type": "bytes4"
      }
    ],
    "name": "registerRootFunctionSelector",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "contract IStoreHook",
        "name": "hookAddress",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "enabledHooksBitmap",
        "type": "uint8"
      }
    ],
    "name": "registerStoreHook",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "contract WorldContextConsumer",
        "name": "system",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "publicAccess",
        "type": "bool"
      }
    ],
    "name": "registerSystem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "contract ISystemHook",
        "name": "hookAddress",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "enabledHooksBitmap",
        "type": "uint8"
      }
    ],
    "name": "registerSystemHook",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      },
      {
        "internalType": "Schema",
        "name": "keySchema",
        "type": "bytes32"
      },
      {
        "internalType": "Schema",
        "name": "valueSchema",
        "type": "bytes32"
      },
      {
        "internalType": "string[]",
        "name": "keyNames",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "fieldNames",
        "type": "string[]"
      }
    ],
    "name": "registerTable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "registerWithName",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "player",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "grantee",
        "type": "address"
      }
    ],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint8",
        "name": "schemaIndex",
        "type": "uint8"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "setField",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      },
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      }
    ],
    "name": "setMembers",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "setRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "levelId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "offset",
        "type": "uint256"
      }
    ],
    "name": "spawnLevelDev",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "player",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "spawnPoint",
        "type": "bytes32"
      }
    ],
    "name": "spawnPlayer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "prototypeId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "ownerId",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "int32",
            "name": "x",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "y",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "z",
            "type": "int32"
          }
        ],
        "internalType": "struct PositionData",
        "name": "position",
        "type": "tuple"
      }
    ],
    "name": "spawnPrototypeDev",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "matchEntity",
        "type": "bytes32"
      }
    ],
    "name": "toggleReady",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "token",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "to",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes16",
        "name": "fromNamespace",
        "type": "bytes16"
      },
      {
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferBalanceToAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes16",
        "name": "fromNamespace",
        "type": "bytes16"
      },
      {
        "internalType": "bytes16",
        "name": "toNamespace",
        "type": "bytes16"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferBalanceToNamespace",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "token",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "from",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "to",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes16",
        "name": "namespace",
        "type": "bytes16"
      },
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "contract IStoreHook",
        "name": "hookAddress",
        "type": "address"
      }
    ],
    "name": "unregisterStoreHook",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "resourceSelector",
        "type": "bytes32"
      },
      {
        "internalType": "contract ISystemHook",
        "name": "hookAddress",
        "type": "address"
      }
    ],
    "name": "unregisterSystemHook",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "table",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "key",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint8",
        "name": "schemaIndex",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "startByteIndex",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "dataToSet",
        "type": "bytes"
      },
      {
        "internalType": "FieldLayout",
        "name": "fieldLayout",
        "type": "bytes32"
      }
    ],
    "name": "updateInField",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "levelId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32[]",
        "name": "templateIds",
        "type": "bytes32[]"
      },
      {
        "components": [
          {
            "internalType": "int32",
            "name": "x",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "y",
            "type": "int32"
          },
          {
            "internalType": "int32",
            "name": "z",
            "type": "int32"
          }
        ],
        "internalType": "struct PositionData[]",
        "name": "positions",
        "type": "tuple[]"
      }
    ],
    "name": "uploadMap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; export default abi;
