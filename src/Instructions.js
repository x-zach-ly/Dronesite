import React from "react";
import { useState } from 'react';
import DroneStatus from './DroneStatus'
import './Instructions.css';
import './Dropdown'
import DestinationDropdown from "./Dropdown";

function Instructions() {

    const[droneNumber, setDroneNumber] = useState(1);

    const drones = [
        {id:'1', status:'idle', currentLocation:'Station 1'},
        {id:'2', status:'busy', currentLocation:'moving'}
    ];

    const columns = Object.keys(drones[0]);

    return (
        <div className="Instructions">
            <header className="Instructions-header">
                <h1>Instructions</h1>
            </header>
            <body className="Instructions-body">
                <table>
                    <tr>
                        <th>Drone ID</th>
                        <th>Status</th>
                        <th>Location</th>
                    </tr>
                    {drones.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.id}</td>
                            <td>{val.status}</td>
                            <td>{val.currentLocation}</td>
                            <button>Call Drone</button>
                            <DestinationDropdown/>
                        </tr>
                    )
                })}
                </table>
            </body>
        </div>
    );
}

export default Instructions;