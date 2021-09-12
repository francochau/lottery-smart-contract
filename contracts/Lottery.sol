pragma solidity >=0.4.21 <0.7.0;

contract Lottery {
    uint public lotteryCount = 0;
    address public owner;

    struct LotteryPool{
        uint id;
        string name;
        address owner;
        uint price;
        uint poolSize;
        address payable[] participants;
        address payable winner;
        bool alive;
    }    

    mapping (uint => LotteryPool) public lotteryPools;

    event PoolCreated(        
        uint id,
        string name,
        address owner,
        uint price,
        uint poolSize
        );

    function createPool(string memory name, uint price) public {
        require(bytes(name).length > 0);
        require(price > 0);
        lotteryCount++;
        address payable[] memory participants;
        lotteryPools[lotteryCount] = LotteryPool(lotteryCount, name, msg.sender, price * 1 szabo, 0, participants, address(0) ,true);
        emit PoolCreated(lotteryCount, name, msg.sender, price * 1 szabo, 0);
    }

    constructor() public{
        createPool("First Pool", 100000);
    }

    event PlayerParticipated(
        uint poolId,
        address playerAddress
    );

    function participate(uint poolId) public payable {
        require(lotteryPools[poolId].alive == true);
        require(msg.value == lotteryPools[poolId].price );
        lotteryPools[poolId].participants.push(msg.sender);
        emit PlayerParticipated(lotteryPools[poolId].participants.length, msg.sender);
    }

    function getParticipants(uint poolId) public view returns(address payable[] memory){
        return lotteryPools[poolId].participants;
    }

    event PoolEnded(
        uint poolId,
        address payable winnerAddr
    );


    function random(uint poolId) private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, now, lotteryPools[poolId].participants)));
    }

    function endPool(uint poolId) public {
        require(lotteryPools[poolId].owner == msg.sender);
        require(lotteryPools[poolId].alive == true);
        uint index = random(poolId) % lotteryPools[poolId].participants.length;
        address payable winnderAddr = lotteryPools[poolId].participants[index];
        winnderAddr.transfer(lotteryPools[poolId].poolSize);
        lotteryPools[poolId].winner = winnderAddr;
        lotteryPools[poolId].alive = false;
        emit PoolEnded(poolId, winnderAddr);
    }


    function getPoolSize(uint poolId) public view returns(uint){
        return lotteryPools[poolId].poolSize;
    }

    // function getPoolList() public view returns(Lottery[] memory) {
    //     return lotteryPools;
    // }

}