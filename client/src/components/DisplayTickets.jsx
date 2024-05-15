import React, { useState, useEffect } from 'react';

function DisplayTicket({ state }) {
    const [tickets, setTickets] = useState([]);
    const { ticketContract, account } = state;
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const ticketsList = await ticketContract.getMemos();
                
                const formattedTickets = ticketsList.map(ticket => ({
                    ticketId: ticket.ticketId.toNumber(),
                    passengerName: ticket.passengerName,
                    departure: ticket.departure,
                    destination: ticket.destination,
                    timestamp: ticket.timestamp.toNumber(),
                    from: ticket.from,
                    flightId: ticket.flightId.toNumber()
                }));

                const filteredTickets = formattedTickets.filter((ticket) => ticket.from.toLowerCase() == account[0].toLowerCase())
                setTickets(filteredTickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        }

        ticketContract && fetchTickets()
    }, [ticketContract])

    return (
        <div className="ticket-container" style={{ overflowX: 'auto', marginBottom: '10px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Ticket ID</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Passenger Name</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Departure</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Destination</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Timestamp</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Flight ID</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.ticketId}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.passengerName}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.departure}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.destination}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{new Date(ticket.timestamp * 1000).toLocaleString()}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{ticket.flightId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayTicket;
