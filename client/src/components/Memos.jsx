import React from "react";
import { useEffect, useState } from "react";
import "./Memos.css"

const Memos = ({state}) => {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect (() => {
        const memosMessage = async () => {
            const memos = await contract.getMemos() ;
            setMemos(memos);
        }
        contract && memosMessage()
    }, [contract])
    return (
        <>
            {memos.map((memo) => {
                return (
                    <div className="memo-container">
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