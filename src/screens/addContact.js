import React, { useEffect, useState } from "react";
import "./addContact.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import cloneDeep from "lodash/cloneDeep";
import { editContact, addToContacts } from "../actions/contactActions";
import { confirmAlert } from "react-confirm-alert";

import addLogo from "../Assets/Images/user-circle-plus.png";

export default function AddContact() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => {
    navigate("/");
  };
  const contacts = useSelector((state) => state.contactsReducer);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [changeMade, setChangeMade] = useState();
  const showInvalidAlert = (validPhone, validEmail) => {
    console.log(validPhone, validEmail);
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="popUpContainer">
          <h1>Error</h1>
          <p>
            Please Introduce a valid{" "}
            {!validPhone && validPhone !== ""
              ? !validEmail && validEmail != ""||!validEmail && !validEmail
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
    if (phoneNumber === undefined) {
      return "";
    }
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return null;
  }
  function validateEmail(email) {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email === undefined) {
      return "";
    }
    return re.test(email);
  }
  const saveNewContact = async () => {
    const validPhoneNumber = validatePhoneNumber(phoneNumber);
    const validEmail = validateEmail(email);
    const lastId = cloneDeep(contacts)[contacts.length - 1].id;
    console.log(lastId);
    const newContact = {
      id: lastId + 1,
      first_name: firstName ? firstName : "",
      last_name: lastName ? lastName : "",
      phoneNumber: validPhoneNumber,
      email: validEmail,
    };
    if (
      (validPhoneNumber || validPhoneNumber == "") &&
      (validEmail || validEmail === "")
    ) {
      await dispatch(addToContacts(newContact));
      goBack();
    } else {
      console.log(validEmail);
      console.log(validPhoneNumber);
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
            onClick={() => (changeMade ? saveNewContact : () => {})}
          >
            <h1 className="buttonText">Add Contact</h1>
          </button>
        </div>
      </div>
    </Box>
  );
}
