import React from "react";
import { useState } from 'react';
import DroneStatus from './DroneStatus'
import './Instructions.css';
import './Dropdown'
import DestinationDropdown from "./Dropdown";
import UseMav from "./UseMav";
import LaunchButton from "./LaunchButton"
import LandButton from "./LandButton.js";
import CommandLine from "./CommandLine.js";

function Instructions() {

    const[droneNumber, setDroneNumber] = useState(1);
    const[status, setStatus] = useState("Idle");

    //hard coded rn
    const drones = [
        {id:'0', status:status, currentLocation:'Station 1'}
    ];

    const columns = Object.keys(drones[0]);

    const handleClick = () => {
        console.log("Button Clicked");
    };

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
                        <th id='drop'>Actions</th>
                    </tr>
                    {drones.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.id}</td>
                                <td>{val.status}</td>
                                <td>{val.currentLocation}</td>
                                <td><UseMav status={status} setStatus={setStatus}/></td>
                            </tr>
                        )
                    })}
                </table>
            </body>
        </div>
    );
}

export default Instructions;