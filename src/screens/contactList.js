import './contactList.css';
import React, { useEffect, Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from 'react-router-dom';
import data from '../Assets/Data/MOCK_DATA.json';
import SearchBar from '../components/SearchBar/SearchBar';
import ContactCard from '../components/ContactCard/ContactCard';
import { setContacts } from '../actions/contactActions';
import PopUp from '../components/PopUp/PopUp';

function ContactList() {
  const navigate = useNavigate();
  const navigateToContactInfo = (id) => {
    navigate(`/contactInfo/${id}`);
  };
  const openAddContact = () => {
    navigate('/AddContact');
  };
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactsReducer[0]) || [];
  const [filterContacts, setFilterContacts] = useState(contacts);
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [openAddPopUp, setOpenAddPopUp] = useState(false);
  const filterFunction = (text) => {
    if (text.length > 0) {
      setFiltering(true);
    } else {
      setFiltering(false);
    }
    const newContacts = cloneDeep(contacts).filter((contact, index) => (contact.first_name.toLowerCase().includes(text.toLowerCase())
      || contact.last_name.toLowerCase().includes(text.toLowerCase())
      || contact.phoneNumber.toLowerCase().includes(text.toLowerCase())
      || contact.email.toLowerCase().includes(text.toLowerCase())));
    setFilterContacts(newContacts);
  };
  const getData = () => data;
  useEffect(() => {
    setLoading(true);
    if (!contacts || contacts.length === 0) {
      dispatch(setContacts(getData()));
    }
    setLoading(false);
  }, []);
  console.log(contacts);
  return (
    <div>
      <style>{'body {background-color:#89B0AE'}</style>
      <div className="headerContainer">
        <SearchBar onChangeText={(text) => filterFunction(text)} />
        <button className="addIconContainer" onClick={() => { openAddContact(); }}>
          <AddCircleOutlineOutlinedIcon className="addIcon" />
        </button>
      </div>
      <div className="contactsContainer">
        <div className="gridContainer">
          {contacts.length > 0 && (filterContacts > 0 || filtering ? filterContacts : contacts).map((contact, index) => (
            <Fragment key={contact.id}>
                <ContactCard
                  firstName={contact.first_name}
                  lastName={contact.last_name}
                  phoneNumber={contact.phoneNumber}
                  id={index}
                  onContactClick={() => {
                    navigateToContactInfo(contact.id);
                  }}
                />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactList;
