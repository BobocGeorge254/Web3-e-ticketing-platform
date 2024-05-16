import React, { useState } from 'react';
import { ethers } from 'ethers';

function Buy({ state }) {
    const [passengerName, setPassengerName] = useState('');
    const [flightId, setFlightId] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');

    const buyTicket = async () => {
        console.log(passengerName, flightId);
        try {
            const { ticketContract, signer } = state;

            const provider = signer.provider;
            const currentGasPrice = await provider.getGasPrice();
            const higherGasPrice = currentGasPrice.mul(120).div(100); 

            const tx = await ticketContract.buyTicket(passengerName, flightId, {
                value: ethers.utils.parseEther('0.01'), 
                gasPrice: higherGasPrice
            });
            await tx.wait();
            setTransactionStatus('Ticket purchased successfully!');
            console.log("Ticket purchased successfully");
        } catch (error) {
            console.error('Error purchasing ticket:', error);
            setTransactionStatus('Error purchasing ticket. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '10px' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Buy Ticket</h2>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="passengerName" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Passenger Name:</label>
                <input
                    type="text"
                    id="passengerName"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="flightId" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Flight ID:</label>
                <input
                    type="number"
                    id="flightId"
                    value={flightId}
                    onChange={(e) => setFlightId(e.target.value)}
                    style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>

            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={buyTicket}
                    style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
                >
                    Buy Ticket
                </button>
            </div>
            {transactionStatus && <p style={{ textAlign: 'center', marginTop: '20px', color: transactionStatus.includes('successfully') ? '#28a745' : '#dc3545' }}>{transactionStatus}</p>}
        </div>
    );
}

export default Buy;
