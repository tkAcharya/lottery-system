const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
// We used capital in Web3 since this will initialize using the constructor option
//We require a provider to help us connect web3 to ganache
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let contractObject;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  contractObject = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000'})
});


describe('Lottery Tests', () => {
  it('Verifying the Deployment',() => {
    console.log(accounts);
    assert.ok(contractObject.options.address);
  });

  // it('Registering a player',async () => {
  //   await contractObject.methods.entry().send({ from: accounts[0]});
  //   const message = await inbox.methods.message().call();
  //   assert.equal(message , localMessage);
  //
  // });





});
