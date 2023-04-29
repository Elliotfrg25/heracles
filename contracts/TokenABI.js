const fs = require('fs');
const web3 = require('../config/web3Config');

const tokenABIContent = fs.readFileSync(__dirname + '/../contracts/TokenABI.json', 'utf8');
const tokenABI = JSON.parse(tokenABIContent);

const tokenContract = new web3.eth.Contract(tokenABI, process.env.TOKEN_CONTRACT_ADDRESS);

module.exports = tokenContract;

