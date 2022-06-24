import React, { useState } from "react";
import "./contactInfo.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { confirmAlert } from "react-confirm-alert";
import { deleteContact, editContact } from "../actions/contactActions";
import logo from "../Assets/Images/Profile-1.png";
import deleteIcon from "../Assets/Images/delete.png";

import "react-confirm-alert/src/react-confirm-alert.css";

export default function ContactInfo() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const contact =
    useSelector(
      (state) =>
        state.contactsReducer &&
        state.contactsReducer.filter((contact) => contact.id === contactId)
    ) || [];
  const contactInfo = contact[0] || [];
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(contactInfo.first_name);
  const [lastName, setLastName] = useState(contactInfo.last_name);
  const [phoneNumber, setPhoneNumber] = useState(contactInfo.phoneNumber);
  const [email, setEmail] = useState(contactInfo.email);
  const [changeMade, setChangeMade] = useState(false);
  const goBack = () => {
    navigate("/");
  };

  const confirmDeleteContact = async (id) => {
    if (contact) {
      await dispatch(deleteContact(id));
    }
  };
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
  const showDeleteConfirmationModal = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="popUpContainer">
          <h1 className="deleteHeader">DELETE USER</h1>
          <p className="deleteBody">
            Are you sure you want to delete {firstName} {lastName}?
          </p>
          <div className="deleteButtonsContainer">
            <button onClick={onClose} className="cancelButton">
              Cancel
            </button>
            <button
              onClick={() => {
                goBack();
                confirmDeleteContact(contact[0].id);
                onClose();
              }}
              className="confirmButton"
            >
              Confirm
            </button>
          </div>
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
  const saveContactInformation = () => {
    const validPhoneNumber = validatePhoneNumber(phoneNumber);
    const validEmail = validateEmail(email);
    const newContact = {
      id: contactId,
      first_name: firstName !== undefined ? firstName : "",
      last_name: lastName !== undefined ? lastName : "",
      phoneNumber,
      email,
    };
    if (
      (validPhoneNumber || phoneNumber === "") &&
      (validEmail || email === "")
    ) {
      goBack();
      dispatch(editContact(newContact));
    } else {
      showInvalidAlert(validPhoneNumber, validEmail);
    }
  };
  return (
    <div className={"contact-Container"}>
      <button
        className="backButton"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowBackIcon className="backIcon" />
        <h1 className="buttonText">Contact List</h1>
      </button>
      <img src={logo} className="infoPicture" alt="Contact Logo" />
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
          <button
            className={changeMade ? "editButton" : "hideButton"}
            onClick={() => saveContactInformation()}
          >
            <h1 className="buttonText">Save Changes</h1>
          </button>
          <button onClick={() => showDeleteConfirmationModal()}>
            <img src={deleteIcon} className="deleteIcon" alt="Delete Button" />
          </button>
        </div>
      </div>
    </div>
  );
}
