import React from "react";
import { useEffect, useState } from "react";
import "./Memos.css"

const Memos = ({state}) => {
    const [memos, setMemos] = useState([]);
    const { ticketContract } = state;

    useEffect (() => {
        const memosMessage = async () => {
            const memos = await ticketContract.getMemos() ;
            setMemos(memos);
        }
        ticketContract && memosMessage()
    }, [ticketContract])
    return (
        <>
            {memos.map((memo) => {
                return (
                    <div className="memo-container">
                        <p className="element">{memo.ticketId.toString()}</p>
                        <p className="element">{memo.passengerName}</p>
                        <p className="element">{memo.departure}</p>
                        <p className="element">{memo.destination}</p>
                        <p className="element">{new Date(memo.timestamp * 1000).toLocaleString()}</p>
                        <p className="element">{memo.from}</p>
                    </div>
                );
            })}
        </>
    )
}

export default Memos