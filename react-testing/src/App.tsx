import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Greet } from './Components/Greet/Greet';
import { Application } from './Components/Application/Application';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Greet name="Computer"/>
        <Application />
        <label>Sreenivasulu Gattu</label>
        <a href="#">Learn React</a>
      </header>
    </div>
  );
}

export default App;
