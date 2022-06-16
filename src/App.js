import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import data from './Assets/Data/MOCK_DATA.json'

function App() {
  const getData=()=>data;
  useEffect(() => {
    //TODO:If the state is empty then get the information from the data json
    //and dispatch it to the state
    const data=getData();
    console.log(data);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
