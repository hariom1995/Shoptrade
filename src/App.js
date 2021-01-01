import React from 'react';
import './App.css';
import { Routes } from './Routes/Routes'
import { BrowserRouter } from "react-router-dom";
import { AlertSnackBar } from './Components/Alert/Alert'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AlertSnackBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
