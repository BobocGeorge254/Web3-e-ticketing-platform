import React from 'react';
import Add from './Add';
import DisplayFlights from './DisplayFlights';

const Flights = ({ state }) => {
    return (
        <div>
            <Add state={state} />
            <DisplayFlights state={state} />
        </div>
    );
}

export default Flights;
