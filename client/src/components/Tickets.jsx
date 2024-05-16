import React from 'react';
import Buy from './Buy';
import DisplayTicket from './DisplayTickets';
import Trade from './Trade';

const Tickets = ({ state }) => {
    return (
        <div>
            <Buy state={state} />
            <DisplayTicket state={state} />
            <Trade state={state} />
        </div>
    );
}

export default Tickets;
