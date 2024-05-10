import React from 'react';
import { ethers } from "ethers"
import './App.css'
import { useState, useEffect } from 'react'
import ticketAbi from "./contractJson/ticket.json"
import ticketTransferAbi from "./contractJson/TicketTransfer.json"
import Buy from './components/Buy';
import Memos from './components/Memos';
import Trade from './components/Trade';


function App() {
  const [stateTicketsContract, setStateTicketsContract] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [stateTicketsTransferContract, setStateTicketsTransferContract] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xDb5998917F8df7D10f73Fd578832588bf4b961BB";
      const contractABI = ticketAbi.abi;

      const transferContractAddress = "0xEEaD0F01Ae5Efb8B91876DD586aef4Dd5539b35E";
      const transferContractABI = ticketTransferAbi.abi;

      try {
        const { ethereum } = window ;
        console.log(ethereum)
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        setAccount(account)
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const ticketContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        const tradeTicketContract = new ethers.Contract(
          transferContractAddress,
          transferContractABI,
          signer
        )
        setStateTicketsContract({provider, signer, ticketContract});
        setStateTicketsTransferContract({provider, signer, tradeTicketContract})
      }
      catch(err) {
        console.log(err);
      }

    }
    template()
  }, [])

  return (
    <div className="App">
      Connected account : {account}
      <Buy state={stateTicketsContract} />
      <Memos state={stateTicketsContract} />
      <Trade state={stateTicketsContract} />
    </div>
  )
}

export default App
