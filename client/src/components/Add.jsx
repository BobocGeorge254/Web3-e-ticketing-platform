import React, { useState } from 'react';

function Add({ state }) {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [duration, setDuration] = useState('');
    const [capacity, setCapacity] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');

    const addFlight = async () => {
        try {
            const { flightContract } = state;
            const timestamp = Date.parse(departureTime) / 1000; 

            const tx = await flightContract.addFlight(departure, destination, timestamp, duration, capacity);
            await tx.wait();
            setTransactionStatus('Flight added successfully!');
        } catch (error) {
            console.error('Error adding flight:', error);
            setTransactionStatus('Error adding flight. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '10px'}}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Add Flight</h2>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="departure" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Departure:</label>
                <input
                    type="text"
                    id="departure"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="destination" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Destination:</label>
                <input
                    type="text"
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="departureTime" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Departure Time:</label>
                <input
                    type="datetime-local"
                    id="departureTime"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="duration" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Duration:</label>
                <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="capacity" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Capacity:</label>
                <input
                    type="number"
                    id="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={addFlight}
                    style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
                >
                    Add Flight
                </button>
            </div>
            {transactionStatus && <p style={{ textAlign: 'center', marginTop: '20px', color: transactionStatus.includes('successfully') ? '#28a745' : '#dc3545' }}>{transactionStatus}</p>}
        </div>
    );

}

export default Add;
