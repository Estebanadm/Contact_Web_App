import React, { useState } from "react";
import "./addContact.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { addToContacts } from "../actions/contactActions";
import { confirmAlert } from "react-confirm-alert";

import addLogo from "../Assets/Images/user-circle-plus.png";

export default function AddContact() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => {
    navigate("/");
  };
  const contacts = useSelector((state) => state.contactsReducer);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [changeMade, setChangeMade] = useState(false);
  const showInvalidAlert = (validPhone, validEmail) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="popUpContainer">
          <h1>Error</h1>
          <p>
            Please Introduce a valid{" "}
            {!validPhone && phoneNumber !== ""
              ? !validPhone && !validEmail && email !== ""
                ? "phone number and email"
                : "phone Number"
              : "email"}
          </p>
          <button onClick={onClose} className="errorMessageButton">
            Confirm
          </button>
        </div>
      ),
    });
  };
  function validatePhoneNumber(phoneNumber) {
    const cleaned = `${phoneNumber}`.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return false;
  }
  function validateEmail(email) {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  const saveNewContact = () => {
    const validPhoneNumber = validatePhoneNumber(phoneNumber);
    const validEmail = validateEmail(email);
    var lastId = 0;
    contacts.forEach((element) => {
      if (element.id > lastId) {
        lastId = parseInt(element.id);
      }
    });
    const newContact = {
      id: (lastId + 1).toString(),
      first_name: firstName,
      last_name: lastName,
      phoneNumber: phoneNumber,
      email,
    };
    if (
      (validPhoneNumber || phoneNumber === "") &&
      (validEmail || email === "")
    ) {
      dispatch(addToContacts(newContact));
      goBack();
    } else {
      showInvalidAlert(validPhoneNumber, validEmail);
    }
  };
  return (
    <Box className="contactAddContainer">
      <button
        className="backButton"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowBackIcon className="back-Icon" />
        <h1 className="buttonText">Contact List</h1>
      </button>
      <img src={addLogo} className="addPicture" alt="Add Contact Logo" />
      <div className="contactInfoContainer">
        <div className="contactInput">
          <input
            className="addInput"
            value={firstName}
            placeholder="First Name..."
            onChange={(text) => {
              setChangeMade(true);
              setFirstName(text.target.value);
            }}
          />
        </div>
        <div className="contactInput">
          <input
            className="addInput"
            value={lastName}
            placeholder="Last Name..."
            onChange={(text) => {
              setChangeMade(true);
              setLastName(text.target.value);
            }}
          />
        </div>
        <div className="contactInput">
          <input
            className="addInput"
            value={phoneNumber}
            placeholder="Phone Number..."
            onChange={(text) => {
              setChangeMade(true);
              setPhoneNumber(text.target.value);
            }}
          />
        </div>
        <div className="contactInput">
          <input
            className="addInput"
            value={email}
            placeholder="Email Address..."
            onChange={(text) => {
              setChangeMade(true);
              setEmail(text.target.value);
            }}
          />
        </div>
        <div className="center">
          <button
            className={changeMade ? "addContactButton" : "hideButton"}
            onClick={() => (changeMade ? saveNewContact() : () => {})}
          >
            <h1 className="buttonText">Add Contact</h1>
          </button>
        </div>
      </div>
    </Box>
  );
}
