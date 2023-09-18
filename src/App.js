// src/App.js
import React from 'react';
import './App.css';
import GazeTracker from './GazeTracker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React WebGazer Demo</h1>
      </header>
      <main>
        <GazeTracker />
      </main>
    </div>
  );
}

export default App;
