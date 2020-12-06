const path = require('path');
const fs = require('fs');
const solc = require('solc');


const lotteryPath = path.resolve(__dirname,'contracts','Lottery.sol');
const source = fs.readFileSync(lotteryPath,'utf8');

//Compilation of the code
//console.log(solc.compile(source,1)); //1 here defines how many different number of contracts to compile

//Since we are having only one contract so we can access the byte code
//directly by using the below statement , note to understand please execute
//line number 9 and check the log
module.exports = solc.compile(source,1).contracts[':Lottery'];
