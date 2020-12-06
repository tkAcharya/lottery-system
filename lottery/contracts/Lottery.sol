pragma solidity ^0.4.17;

contract Lottery {

    address public manager;
    //address public winner;
    address[] public players;

    function Lottery() public {
        manager = msg.sender; //It is a global variable (contains info of the person initiating a transaction
        // in this case a function call of transaction)
    }

    //payable is used whenever someone calls with some amt of ether (or there is a func call that requires some ether)
    function entry() public payable {
        require(msg.value > .01 ether); //used for validation , is a boolean expression

        players.push(msg.sender); //sender is the one calling the function
    }

    function random() private view returns(uint){
        return uint(sha3(block.difficulty, now, players));

    }

    function cleanUpContract() private{
        players = new address[](0);
    }

    function pickWinner() public {
        require(msg.sender==manager);
        uint index = random()%players.length;
        players[index].transfer(this.balance);
        cleanUpContract();
       // winner = players[index];
    }


    function getPlayers() public view returns(address[]){
        return players;
    }

}
