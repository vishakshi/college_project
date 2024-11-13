import React from 'react';
import LogForm from './components/LogForm';
import './App.css';  // Importing custom styles
import logo from './assets/logo.png';  // Import your logo image

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Fake Log Detection</h1>
        <p>Detect fake log entries using advanced AI and machine learning</p>
      </header>
      <main>
        <LogForm />
      </main>
    </div>
  );
}

export default App;
