/* eslint-disable no-unused-vars */
import './App.css'
import React, { useEffect, Fragment, useState } from 'react'
import data from './Assets/Data/MOCK_DATA.json'
import Box from '@mui/material/Box'
import SearchBar from './components/SearchBar/SearchBar';
import ContactCard from './components/ContactCard/ContactCard';
import { useSelector, useDispatch } from 'react-redux';
import { setContacts } from './actions/contactActions';
import ContactInfo from './screens/contactInfo';
import ContactList from './screens/contactList';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";


function App () {
  return (
      <div >
        <style>{'body {background-color:#89B0AE'}</style>
        <div className={'container'}>
          <Box className={'boxContainer'}>
            <Routes>
            <Route path="/" element={<ContactList/>}/>
              <Route path="/ContactInfo" element={<ContactInfo/>}>
                <Route path=":contactId" element={<ContactInfo/>}/>
              </Route>
            </Routes>
          </Box>
        </div>
      </div>
  )
}

export default (App);
