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

    mapping(address => uint[]) public userTickets;

    constructor (address _flightContractAddress) {
        owner = payable(msg.sender);
        flightContract = Flight(_flightContractAddress);
    }

    event TicketTransferred(uint ticketId, address indexed from, address indexed to);

    function buyTicket(string memory _passengerName, uint _flightId) external payable {
        require(msg.value > 0, "Please pay more than 0");
        Flight.FlightDetails memory flight = flightContract.getFlight(_flightId);
        require(isValidDeparture(flight.departure), "Invalid departure");
        require(isValidDestination(flight.destination), "Invalid destination");

        owner.transfer(msg.value);
        uint256 newTicketId = memos.length;
        memos.push(Memo(newTicketId, _passengerName, flight.departure, flight.destination, block.timestamp, msg.sender, _flightId));

        userTickets[msg.sender].push(newTicketId);
        flightContract.updateTicketsSold(_flightId);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function getUserTickets(address user) public view returns (uint[] memory) {
        return userTickets[user];
    }

    function isValidDeparture(string memory _departure) internal view returns (bool) {
        return flightContract.isValidDeparture(_departure);
    }

    function isValidDestination(string memory _destination) internal view returns (bool) {
        return flightContract.isValidDestination(_destination);
    }

    function transferTicket(uint _ticketId, address _to) external {
        require(_ticketId < memos.length, "Invalid ticket ID");
        require(memos[_ticketId].from == msg.sender, "You can only transfer your own tickets");

        uint[] storage senderTickets = userTickets[msg.sender];
        for (uint i = 0; i < senderTickets.length; i++) {
            if (senderTickets[i] == _ticketId) {
                senderTickets[i] = senderTickets[senderTickets.length - 1];
                senderTickets.pop();
                break;
            }
        }

        userTickets[_to].push(_ticketId);

        memos[_ticketId].from = _to;
        emit TicketTransferred(_ticketId, msg.sender, _to);
    }

}
