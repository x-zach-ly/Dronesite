import React from 'react';
import { useState } from 'react';
import './DroneStatus.css';
import { TextField } from '@mui/material';

function DroneStatus({id}) {

    const[status, setStatus] = useState('Idle');

    const handleChange = (e) => {
        setStatus(e.target);
    };

    return (
        <div className="DroneStatus">
            <body className="DroneStatus-body">
                <p>Drone ID: {id}</p>
                <p>Drone Status: {status}</p>
            </body>
            <body className="DroneStatus-commands">
                <button type="callDrone">Call Drone</button>
                <div>
                  <label htmlFor="username">Destination:</label>
                  <input
                      name="username"
                      id="username"
                      onChange={e => setStatus(e.target.value)}
                      required
                  />
              </div>
            </body>
        </div>
    );
}

export default DroneStatus;