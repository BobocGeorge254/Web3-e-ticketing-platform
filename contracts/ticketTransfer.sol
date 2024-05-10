// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./ticket.sol";

contract TicketTransfer {
    ticket public ticketContract;

    constructor(ticket _ticketContract) {
        ticketContract = _ticketContract;
    }

    function transferTicket(uint _ticketId, address _to) external {
        ticketContract.transferTicket(_ticketId, _to);
    }
}