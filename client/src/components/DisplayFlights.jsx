import React, { useState, useEffect } from 'react';

function DisplayFlights ({ state }) {
    const [flights, setFlights] = useState([]);
    const { flightContract } = state;

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const flightsList = await flightContract.getFlights();
                const flightsArray = Object.values(flightsList).map(flight => ({
                    flightId: flight.flightId.toString(),
                    departure: flight.departure,
                    destination: flight.destination,
                    departureTime: flight.departureTime.toNumber(),
                    duration: flight.duration.toNumber(),
                    capacity: flight.capacity.toNumber(),
                    ticketsSold: flight.ticketsSold.toNumber()
                }));
                setFlights(flightsArray);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        }

        flightContract && fetchFlights()
    }, [flightContract])
    return (
        <div className="flight-container" style={{ overflowX: 'auto', marginBottom: '10px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>NO</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Departure</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Destination</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Departure Time</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Duration</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Capacity</th>
                        <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Tickets Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{flight.flightId.toString()}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{flight.departure}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{flight.destination}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{new Date(flight.departureTime * 1000).toLocaleString()}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{Math.round(flight.duration / 3600)} hours</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{flight.capacity}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{flight.ticketsSold}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default DisplayFlights;
