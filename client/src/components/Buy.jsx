import React, { useEffect, useState } from "react";
import "./Buy.css";
import { ethers } from "ethers";

const Buy = ({ state }) => {
    const [departures, setDepartures] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [selectedDeparture, setSelectedDeparture] = useState("");
    const [selectedDestination, setSelectedDestination] = useState("");

    const { contract } = state;

    const buyTicket = async (event) => {
        event.preventDefault();
        const name = document.querySelector("#name").value;
        const amount = {value:ethers.utils.parseEther("0.02")};
        const transaction = await contract.buyTicket(name, selectedDeparture, selectedDestination, amount);
        await transaction.wait();
        alert("Transaction succesful");
        window.location.reload();
        console.log("Selected Departure:", selectedDeparture);
        console.log("Selected Destination:", selectedDestination);


    };

    useEffect(() => {
        const fetchData = async () => {
            if (contract) {
                const departures_ = await contract.getValidDepartures();
                setDepartures(departures_);

                const destinations_ = await contract.getValidDestinations();
                setDestinations(destinations_);
            }
        };

        fetchData();
    }, [contract]);

    return (
        <div className="buy-container">
            <div>
                <label htmlFor="departure">Departure:</label>
                <select
                    id="departure"
                    value={selectedDeparture}
                    onChange={(e) => setSelectedDeparture(e.target.value)}
                >
                    <option value="">Select departure</option>
                    {departures.map((departure, index) => (
                        <option key={index} value={departure}>
                            {departure}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="destination">Destination:</label>
                <select
                    id="destination"
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                >
                    <option value="">Select destination</option>
                    {destinations.map((destination, index) => (
                        <option key={index} value={destination}>
                            {destination}
                        </option>
                    ))}
                </select>
            </div>
            <form onSubmit={buyTicket}>
                <input id="name" placeholder="Enter your name"></input>
                <button type="submit">Buy</button>
            </form>
        </div>
    );
};

export default Buy;
