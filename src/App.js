/* eslint-disable no-unused-vars */
import './App.css';
import React from 'react';
import Box from '@mui/material/Box';
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from 'react-router-dom';
import ContactInfo from './screens/contactInfo';
import ContactList from './screens/contactList';
import AddContact from './screens/addContact';

function App() {
  return (
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/ContactInfo" element={<ContactInfo />}>
              <Route path=":contactId" element={<ContactInfo />} />
            </Route>
            <Route path="/AddContact" element={<AddContact />} />
          </Routes>
  );
}

export default (App);
