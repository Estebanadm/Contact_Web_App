import React, { Fragment } from 'react';
import './ContactCard.css';
import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from '../../Assets/Images/Profile-1.png';

function ContactCard({
  firstName, lastName, phoneNumber, onContactClick,
}) {
  const contactName = `${firstName} ${lastName}`;
  const phone = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  return (
    <button onClick={() => onContactClick()}>
      <Box className="contactBox" >
        <img src={logo} className="profilePicture" />
        <div className="contactInfo">
          <h1 className="contactHeader">{contactName}</h1>
          <h1 className="contactNumber">{phone}</h1>
        </div>
        <ChevronRightIcon className="icon" />
      </Box>
    </button>
  );
}

export default ContactCard;
