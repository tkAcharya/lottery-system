const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.mnemonic,
  process.env.link
);

const web3 = new Web3(provider);
let INITIAL_STRING = "Hi there deploy!"


const deployContract = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from', accounts[0]);

    const inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode , arguments: [INITIAL_STRING]})
      .send({ from: accounts[0], gas: '1000000'})

    console.log('Contract deployed to', inbox.options.address);
  };
deployContract();
