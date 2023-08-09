// get the abi value from artifact folder
export const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "role",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "uid",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "walletAddress",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "role_",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "uid_",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "walletAddress_",
          "type": "string"
        }
      ],
      "name": "register",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
