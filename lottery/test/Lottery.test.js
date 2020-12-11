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

  it('Registering First player',async () => {
    await contractObject.methods.entry().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02','ether')
    });
    const players = await contractObject.methods.getPlayers().call();

//    const players = await contractObject.methods.getPlayers().call({from: accounts[0]});

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);

  });

 it('Registering Multiple players',async () => {
   await contractObject.methods.entry().send({
     from: accounts[0],
     value: web3.utils.toWei('0.02','ether')
   });
   await contractObject.methods.entry().send({
     from: accounts[1],
     value: web3.utils.toWei('0.02','ether')
   });
   await contractObject.methods.entry().send({
     from: accounts[2],
     value: web3.utils.toWei('0.02','ether')
   });
   const players = await contractObject.methods.getPlayers().call();

 //    const players = await contractObject.methods.getPlayers().call({from: accounts[0]});

   assert.equal(accounts[0], players[0]);
   assert.equal(accounts[1], players[1]);
   assert.equal(accounts[2], players[2]);
   assert.equal(3, players.length);

 });

 it("Verifying the value of ether should be more than 0.01" , async () => {
   try {
     await contractObject.methods.entry().send({
       from: accounts[0],
       value: 0
     });
     assert(false);
   } catch (e) {
     //console.log("Passed the negative test");
     assert.ok(e);
   }
   });

   it("Verifying only manager can call pick winner" , async () => {
     try {
       await contractObject.methods.pickWinner().send({
         from: accounts[1]
       });
       assert(false);
     } catch (e) {
       //console.log("Passed the negative test");
       assert.ok(e);
     }
     });


});
