import React from 'react';
import { ethers } from "ethers"
import './App.css'
import { useState, useEffect } from 'react'
import ticketAbi from "./contracts/Ticket.json"
import flightAbi from "./contracts/Flight.json"
import Tickets from './components/Tickets';
import Flights from './components/Flights';

import {
  BrowserRouter,
  Route,
  Routes,

} from "react-router-dom";


function App() {
  const [stateTicketsContract, setStateTicketsContract] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [stateFlightsContract, setStateFlightsContract] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const flightContractAddress = "0xcCcB8238fD7cf3673E21645C55296EB125Cbd25F";
      const flightContractABI = flightAbi.abi;

      const ticketContractAddress = "0x7174Bc26eb5354e3791eF1F9F2fb0144Bf5afc37";
      const ticketContractABI = ticketAbi.abi;

      try {
        const { ethereum } = window ;

        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        setAccount(account)
        console.log(account[0])
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const flightContract = new ethers.Contract(
          flightContractAddress,
          flightContractABI,
          signer
        )

        const ticketContract = new ethers.Contract(
          ticketContractAddress,
          ticketContractABI,
          signer,
        )
        
        setStateFlightsContract({provider, signer, flightContract});
        setStateTicketsContract({provider, signer, ticketContract, account});
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
      <BrowserRouter>
        <Routes>
          <Route path="/flights" element={<Flights state={stateFlightsContract} />} />
          <Route path="/" element={<Tickets state={stateTicketsContract} />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
