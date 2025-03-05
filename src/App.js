import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Instructions from './Instructions';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/Instructions/" element={<Instructions/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
