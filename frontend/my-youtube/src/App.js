import React, {useEffect} from "react";
import logo from './logo.svg';
import './App.css';

const TITLE = "YouTube FrameSeeker AI"

function App() {
  // Modify the web page name
  useEffect(()=>{
    document.title = TITLE
  }, []);

  // Main Section of the web page
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>Test-Programme is run proporly</div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
