//import logo from "./droneImage.png";
import icon from "./userIcon.png";
import React from 'react';
import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //const [verified, setVerified] = useState('');

    const valid_IDs = [
        {userID:'zlb325', password:'12345'},
        {userID:'abc123', password:'abc123'}
    ];

    const onClick = async(e) => {
        e.preventDefault();
        for(let i = 0; i < valid_IDs.length; i++) {
            if(userID === valid_IDs[i].userID && password === valid_IDs[i].password) {
                console.log("Valid ID");
                navigate("/instructions/");
            }
        }
        console.log("Invalid ID");
        setMessage("Invalid userID or password");
    }

    return (
        <form className="Form" onSubmit={onClick}>
          <div className="Login">
              <header className="Login-header">
                  <img src={icon} className="Login-logo" alt="logo"/>
                  <h1>User Login</h1>
              </header>
              <body className='Login-body'>
                <div>
                    <label htmlFor="userID">UserID:</label>
                    <input
                        value={userID}
                        name="userID"
                        id="userID"
                        onChange={e => setUserID(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                    
                        value={password}
                        name="password"
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="Button" type="submit" onClick={onClick}>Submit</button>
              </body>
              <p className="ErrorMessage">{message}</p>
          </div>
          </form>
      );
}

export default Login;