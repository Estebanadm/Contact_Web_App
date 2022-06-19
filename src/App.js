import './App.css';
import React, { useEffect } from 'react';
import data from './Assets/Data/MOCK_DATA.json';
import Box from '@mui/material/Box';

function App() {
  const getData=()=>data;
  useEffect(() => {
    //TODO:If the state is empty then get the information from the data json
    //and dispatch it to the state
    const data=getData();
    console.log(data);
  }, []);
  return (
    <div >
      <style>{'body {background-color:#89B0AE'}</style>
      <div class={"container"}>
        <Box class={"boxContainer"}></Box>
      </div>
    </div>
  );
}

export default App;
