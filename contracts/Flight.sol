pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Flight {
    struct FlightDetails {
        uint flightId;
        string departure;
        string destination;
        uint departureTime;
        uint duration;
        uint capacity;
        uint ticketsSold;
    }

    FlightDetails[] public flights;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    function addFlight(string memory _departure, string memory _destination, uint _departureTime, uint _duration, uint _capacity) external onlyAdmin {
        flights.push(FlightDetails(flights.length, _departure, _destination, _departureTime, _duration, _capacity, 0));
    }

    function getFlight(uint _flightId) external view returns (FlightDetails memory) {
        require(_flightId < flights.length, "Flight does not exist");
        return flights[_flightId];
    }

    function getFlights() external view returns (FlightDetails[] memory) {
        return flights;
    }
    function updateTicketsSold(uint _flightId) external {
        require(flights[_flightId].ticketsSold < flights[_flightId].capacity, "No more tickets available");
        flights[_flightId].ticketsSold++;
    }

    function isValidDeparture(string memory _departure) public view returns (bool) {
        for (uint256 i = 0; i < flights.length; i++) {
            if (keccak256(bytes(flights[i].departure)) == keccak256(bytes(_departure))) {
                return true;
            }
        }
        return false;
    }

    function isValidDestination(string memory _destination) public view returns (bool) {
        for (uint256 i = 0; i < flights.length; i++) {
            if (keccak256(bytes(flights[i].destination)) == keccak256(bytes(_destination))) {
                return true;
            }
        }
        return false;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
}