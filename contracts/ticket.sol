  // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";
import "./Flight.sol";

contract Ticket {
    struct Memo {
        uint ticketId;
        string passengerName;
        string departure;
        string destination;
        uint timestamp;
        address from;
        uint flightId;
    }

    Memo[] public memos;
    address payable owner;
    Flight public flightContract;

    constructor (address _flightContractAddress) {
        owner = payable (msg.sender);
        flightContract = Flight(_flightContractAddress);
    }

    function buyTicket(string memory _passengerName, uint _flightId) external payable {
        require(msg.value > 0, "Please pay more than 0");
        Flight.FlightDetails memory flight = flightContract.getFlight(_flightId);
        require(isValidDeparture(flight.departure), "Invalid departure");
        require(isValidDestination(flight.destination), "Invalid destination");
        
        owner.transfer(msg.value);
        uint256 newTicketId = memos.length;
        memos.push(Memo(newTicketId, _passengerName, flight.departure, flight.destination, block.timestamp, msg.sender, _flightId));

        flightContract.updateTicketsSold(_flightId);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function isValidDeparture(string memory _departure) internal view returns (bool) {
        return (flightContract.isValidDeparture(_departure));
    }

    function isValidDestination(string memory _destination) internal view returns (bool) {
        return (flightContract.isValidDestination(_destination));
    }

    function transferTicket(uint _ticketId, address _to) external {
        require(_ticketId < memos.length, "Invalid ticket ID");
        require(memos[_ticketId].from == msg.sender, "You can only transfer your own tickets");
        
        memos[_ticketId].from = _to;
    }
}
