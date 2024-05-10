import React, { useState } from "react";

const Trade = ({ state }) => {
    const { ticketContract } = state;
    const [ticketId, setTicketId] = useState("");
    const [recipientAddress, setRecipientAddress] = useState("");

    const tradeTicket = async () => {
        console.log(recipientAddress)
        try {
            const transaction = await ticketContract.transferTicket(ticketId, recipientAddress);
            await transaction.wait();
            alert("Transaction succesful");
        } catch (error) {
            console.error('Error trading ticket:', error);
        }
    }


    return (
        <div>
            <h2>Trade Ticket</h2>
            <div>
                <label htmlFor="ticketId">Ticket ID:</label>
                <input
                    id="ticketId"
                    type="number"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="recipientAddress">Recipient Address:</label>
                <input
                    id="recipientAddress"
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                />
            </div>
            <button onClick={tradeTicket}>Trade Ticket</button>
        </div>
    );
}

export default Trade;
