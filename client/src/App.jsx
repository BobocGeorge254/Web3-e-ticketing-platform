import React from 'react';
import { ethers } from "ethers"
import './App.css'
import { useState, useEffect } from 'react'
import abi from "./contractJson/ticket.json"
import Buy from './components/Buy';
import Memos from './components/Memos';


function App() {
  const [state2, setState2] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x743D5D61ECF3EEc3e28c25ec25cf1629FD8866D1";
      const contractABI = abi.abi;
      console.log(contractABI)

      try {
        const { ethereum } = window ;
        console.log(ethereum)
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        setAccount(account)
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log(contract)
        setState2({provider, signer, contract});
        console.log("2",contract)
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
      <Buy state={state2} />
      <Memos state={state2} />
    </div>
  )
}

export default App
