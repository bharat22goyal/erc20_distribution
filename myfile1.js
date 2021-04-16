const { promises } = require('dns')
const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/*************' // Your RCP URL goes here
const web3 = new Web3(rpcURL)
const abi = // Your contract ABI goes here 
const address = "" // Contract Address 
const owner = "" // Contract Owner - aka metamask account 

const contract = new web3.eth.Contract(abi, address)

const getTotalSupply = async() => {
  let totSupply =  await contract.methods.totalSupply().call()
  return "totsup: " + totSupply
}

const getName = async() => {
  let name = await contract.methods.name().call()
  return "name: " + name
}

const getSymbol = async() => {
  let symbol = await contract.methods.symbol().call()
  return "symbol: " + symbol
}

const getBalanceOf = async(owner) => {
  let balanceOf = await contract.methods.balanceOf(owner).call()
  return "balanceOf: " + balanceOf
}

const getDecimals =  async() => {
  let decimals = await contract.methods.decimals().call()
  return "decimals: " + decimals
}

const returnValues = async() => {

  console.log(await getTotalSupply())
  console.log(await getName())
  console.log(await getDecimals())
  console.log(await getSymbol())
  console.log(await getBalanceOf(owner))

}

const totalSupply = async() => {
  let retval = await getTotalSupply()
  console.log('retval is: ' + retval)
  return retval
}

module.exports = { returnValues, totalSupply }
returnValues()


