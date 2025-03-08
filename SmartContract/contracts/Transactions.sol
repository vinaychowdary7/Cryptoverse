//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

contract Transactions{
    uint256 transactionCounter;

    event Transfer(address from,address receiver,uint amount,string message,uint timestamp,string keyword);

    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public payable {
    require(msg.value == amount, "Sent value must match the amount specified");

    transactionCounter += 1;
    transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

    receiver.transfer(amount); 

    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }



    function getAllTransactions() public view returns (TransferStruct [] memory) {
        return transactions;
    }

    function getTransactions() public view returns (uint256) {
        return transactionCounter;
    }
}