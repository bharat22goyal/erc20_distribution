const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/1750691d1d10434496d754412592e0ee' // Your RCP URL goes here
const web3 = new Web3(rpcURL)
var Tx = require('ethereumjs-tx').Transaction
const fs = require('fs');
var BigNumber = require('big-number');

//read address file 
  var data = fs.readFileSync('test.txt', 'utf8');
  var addresses= data.split("\n");
  
  //output number of receivers addresses
  console.log("number of ethereum addresses: "+addresses.length)

  const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
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
				"name": "amount",
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
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
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
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
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
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "_totalSupply",
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
		"inputs": [],
		"name": "tokenOwner",
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
	}
]

//contract address
const contractAddress = '0x2359f4788dc0fceec3a1797abd5be436bbcdcca9'

const contract = new web3.eth.Contract(abi, contractAddress)

// name, symbol, total supply
//contract.methods.totalSupply().call((err, result) => { console.log('total supply:'+result) })
contract.methods.name().call((err, result) => { console.log('Name of token: '+result) })
//contract.methods.symbol().call((err, result) => { console.log(result) })
const getTotalSupply = async() => {
	let totSupply =  await contract.methods.totalSupply().call()
	return "totsup: " + totSupply
  }

//Provides functional and fundamental output of the contract
const account1 = '0x8327923e773c8225b9b41286824Cb66b805A94ba' // Your account address 1
const privateKey1 = Buffer.from('21fee58659253f695314f40515f9c5783596415086f53a01a226a38e4b9286fb', 'hex') // Your account PKey 1

const getTransactionCount = async(account) => {
	return await web3.eth.getTransactionCount(account)
  }
  
  const sendTransaction = async(raw) => {
	return await web3.eth.sendSignedTransaction(raw)
  }
  
  const transferFunds = async(account1, account2, amount) => {
  
	let txCount = await getTransactionCount(account1)
  
	//console.log("txCount returned: " + txCount)
	//console.log(account2)
	const txObject = {
	  nonce:    web3.utils.toHex(txCount),
	  gasLimit: web3.utils.toHex(100000), // uses about 36,000 gas so add some buffer
	  gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
	  to: contractAddress,
	  data: contract.methods.transfer(account2, amount).encodeABI()
	}
  
	const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'})
  
	tx.sign(privateKey1)
  
	const serializedTx = tx.serialize()
	const raw = '0x' + serializedTx.toString('hex')
  
	console.log("raw hex transaction: " + raw)
  
	console.log("about to send transaction")
  
	let minedTransaction = await sendTransaction(raw)
	console.log("transaction hash returned: " + minedTransaction.transactionHash)
  
	return `txHash is: ${minedTransaction.transactionHash}`
  }
  

  
 const go =  async (a) => {
	
	// calculate token per account

	let ownerBalance = await contract.methods.totalSupply().call()
	let bal = new BigNumber(ownerBalance)
	let fivepercent = bal.div(100)
	fivepercent = bal.multiply(5)
	let tokenPerAccount = fivepercent.div(addresses.length)
	
	try{
		
		await transferFunds(account1, a, String(tokenPerAccount))
	}catch(err){
		console.log(err)
	}
	
  }
  
  const run=async()=>{
	for(i=0;i<addresses.length;i++){
		console.log('Transaction: ' + String(i+1))
		await go(addresses[i])
	  }
  }

  run()



