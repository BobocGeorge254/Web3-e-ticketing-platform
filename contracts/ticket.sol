// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract ticket {
    struct Memo {
        uint ticketId;
        string passengerName;
        string departure;
        string destination;
        uint timestamp;
        address from;
    }
    Memo[] public memos;
    address payable owner;

    constructor () {
        owner = payable (msg.sender);
    }

    function buyTicket(string memory _passengerName, string memory _departure, string memory _destination) external payable {
        require(msg.value > 0, "Please pay more than 0");
        require(isValidDeparture(_departure), "Invalid departure");
        require(isValidDestination(_destination), "Invalid destination");
        require(keccak256(bytes(_departure)) != keccak256(bytes(_destination)), "Departure and destination cannot be the same");

        owner.transfer(msg.value);
        uint256 newTicketId = memos.length;
        memos.push(Memo(newTicketId, _passengerName, _departure, _destination, block.timestamp, msg.sender));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function getValidDestinations() public pure returns (string[] memory) {
        string[] memory destinations = new string[](3);
        destinations[0] = "New York";
        destinations[1] = "London";
        destinations[2] = "Paris";
        return destinations;
    }

    function getValidDepartures() public pure returns (string[] memory) {
        string[] memory departures = new string[](3); 
        departures[0] = "New York";
        departures[1] = "London";
        departures[2] = "Paris";
        return departures;
    }

    function isValidDeparture(string memory _departure) internal pure returns (bool) {
        return (_departureCompare(_departure, getValidDepartures()) >= 0);
    }

    function isValidDestination(string memory _destination) internal pure returns (bool) {
        return (_departureCompare(_destination, getValidDestinations()) >= 0);
    }

    function _departureCompare(string memory _departureOrDestination, string[] memory validList) private pure returns (int) {
        for (uint256 i = 0; i < validList.length; i++) {
            if (keccak256(bytes(validList[i])) == keccak256(bytes(_departureOrDestination))) {
                return int(i);
            }
        }
        return -1; 
    }

    function transferTicket(uint _ticketId, address _to) external {
        require(_ticketId < memos.length, "Invalid ticket ID");
        require(memos[_ticketId].from == msg.sender, "You can only transfer your own tickets");
        
        memos[_ticketId].from = _to;
    }
}
