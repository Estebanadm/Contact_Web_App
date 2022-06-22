import React, { useEffect, useState } from 'react';
import './contactInfo.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { confirmAlert } from 'react-confirm-alert';
import SearchBar from '../components/SearchBar/SearchBar';
import ContactCard from '../components/ContactCard/ContactCard';
import data from '../Assets/Data/MOCK_DATA.json';
import { editContact, setContacts } from '../actions/contactActions';
import logo from '../Assets/Images/Profile-1.png';
import deleteIcon from '../Assets/Images/delete.png';

import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ContactInfo() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const contact = useSelector((state) => state.contactsReducer[0] && state.contactsReducer[0].filter((contact) => contact.id === contactId)) || [];
  const contactInfo = contact[0] || {};
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactsReducer[0]) || [];
  const [firstName, setFirstName] = useState(contactInfo.first_name);
  const [lastName, setLastName] = useState(contactInfo.last_name);
  const [phoneNumber, setPhoneNumber] = useState(contactInfo.phoneNumber);
  const [email, setEmail] = useState(contactInfo.email);
  const [changeMade, setChangeMade] = useState(false);
  const showInvalidAlert = (validPhone, validEmail) => {
    console.log(validPhone, validEmail);
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="error-PopUp">
          <h1>Error</h1>
          <p>
            Please Introduce a valid
            {!validPhone && validPhone !== '' ? !validEmail && validEmail != '' ? 'phone number and email' : 'phoneNumber' : 'email'}
          </p>
          <button onClick={onClose} className="errorMessageButton">Confirm</button>
        </div>
      ),
    });
  };
  const showDeleteConfirmationModal = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="deleteConfirmationContainer">
          <h1 className="deleteHeader">DELETE USER</h1>
          <p className="deleteBody">
            Are you sure you want to delete 
            {' '}
            {firstName}
            {' '}
            {lastName}
            ?
          </p>
          <div className="deleteButtonsContainer">
            <button onClick={onClose} className="cancelButton">Cancel</button>
            <button onClick={onClose} className="confirmButton">Confirm</button>
          </div>
        </div>
      ),
    });
  };
  const goBack = () => { navigate('/'); };
  function validatePhoneNumber(phoneNumber) {
    const cleaned = (`${phoneNumber}`).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (phoneNumber === undefined) {
      return '';
    }
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return null;
  }
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email === undefined) {
      return '';
    }
    return re.test(email);
  }
  const saveContactInformation = () => {
    const validPhoneNumber = validatePhoneNumber(phoneNumber);
    const validEmail = validateEmail(email);
    const newContact = {
      first_name: firstName !== undefined ? firstName : '',
      last_name: lastName !== undefined ? lastName : '',
      phoneNumber: validPhoneNumber,
      email,
    };
    if ((validPhoneNumber || validPhoneNumber == '') && (validEmail || validEmail === '')) {
      dispatch(editContact(newContact, parseInt(contactId)));
      goBack();
    } else {
      showInvalidAlert(validPhoneNumber, validEmail);
    }
  };
  const getData = () => data;
  useEffect(() => {
    if (!contacts || contacts.length === 0) {
      dispatch(setContacts(getData()));
    }
  }, []);
  return (
    <div>
      <div className="pictureContainer">
        <button className="backButton" onClick={() => { goBack(); }}>
          <ArrowBackIcon className="backIcon" />
          <h1 className="buttonText">Contact List</h1>
        </button>
        <img src={logo} className="infoPicture" />
      </div>
      <div className="contactInfoContainer">
        <div className="contactInput">
          <h1 className="infoText">First Name: </h1>
          <input
            className="textInput"
            value={firstName}
            onChange={(text) => {
              setChangeMade(true);
              setFirstName(text.target.value);
            }}
          />
        </div>
        <div className="contactInput">
          <h1 className="infoText">Last Name: </h1>
          <input
            className="textInput"
            value={lastName}
            onChange={(text) => {
              setChangeMade(true);
              setLastName(text.target.value);
            }}
          />
        </div>
        <div className="contactInput">
          <h1 className="infoText">Phone Number: </h1>
          <input
            className="textInput"
            value={phoneNumber}
            onChange={(text) => {
              setChangeMade(true);
              setPhoneNumber(text.target.value);
            }}
          />
        </div>
        <div className="contactInput">
          <h1 className="infoText">Email Address: </h1>
          <input
            className="textInput"
            value={email}
            onChange={(text) => {
              setChangeMade(true);
              setEmail(text.target.value);
            }}
          />
        </div>
        <div className="row">
          <button className={changeMade ? 'editButton' : 'hideButton'} onClick={() => saveContactInformation()}>
            <h1 className="buttonText">Save Changes</h1>
          </button>
          <button onClick={()=>showDeleteConfirmationModal()}>
            <img src={deleteIcon} className="deleteIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
