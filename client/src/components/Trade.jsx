import React, { useState } from 'react';

function Trade({ state }) {
    const [ticketId, setTicketId] = useState('');
    const [transferTo, setTransferTo] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    const transferTicket = async () => {
        try {
            const { ticketContract } = state;
            
            const transaction = await ticketContract.transferTicket(ticketId, transferTo);
            await transaction.wait();
            setTransactionHash(transaction.hash);
        } catch (error) {
            console.error('Error transferring ticket:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '10px' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Transfer Ticket</h2>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="ticketId" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Ticket ID:</label>
                <input
                    type="number"
                    id="ticketId"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="transferTo" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Transfer To:</label>
                <input
                    type="text"
                    id="transferTo"
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                    style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={transferTicket}
                    style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
                >
                    Transfer Ticket
                </button>
            </div>
            {transactionHash && <p style={{ textAlign: 'center', marginTop: '20px', color: '#28a745' }}>Transaction Hash: {transactionHash}</p>}
        </div>
    );
}

export default Trade;
