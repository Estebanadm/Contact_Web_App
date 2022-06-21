import React ,{useEffect,useState}from "react";
import './addContact.css';
import SearchBar from "../components/SearchBar/SearchBar";
import ContactCard from "../components/ContactCard/ContactCard";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import data from '../Assets/Data/MOCK_DATA.json';
import { editContact, addToContacts } from '../actions/contactActions';
import logo from '../Assets/Images/Profile-1.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box'
import addLogo from '../Assets/Images/user-circle-plus.png';
import cloneDeep from 'lodash/cloneDeep';



export default function AddContact() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const goBack = () => {navigate(`/`);}
  const contacts = useSelector(state => state.contactsReducer[0])||[];

  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [phoneNumber,setPhoneNumber] = useState();
  const [email,setEmail] = useState();
  const [changeMade,setChangeMade] = useState();
  function validatePhoneNumber(phoneNumber) {
    var cleaned = ('' + phoneNumber).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return null;
  }
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    return re.test(email);
  }
  const saveNewContact=()=>{
    const validPhoneNumber = validatePhoneNumber(phoneNumber);
    const validEmail = validateEmail(email);
    const lastId= cloneDeep(contacts).pop().id;
    console.log(lastId)
    const newContact={
      id:lastId+1,
      first_name:firstName,
      last_name:lastName,
      phoneNumber:validPhoneNumber,
      email:email
    }
    if(validPhoneNumber && validEmail){
    dispatch(addToContacts(newContact));
    goBack();
    }else{
      if(!validPhoneNumber){
        alert("Please enter a valid phone number");
      }
      if(!validEmail){
        alert("Please enter a valid email");
      }
    }
  }
  return( 
    <React.Fragment>
       <Box className={"addContainerBox"}>
       <button className={"back-Button"} onClick={()=>{goBack()}}>
          <ArrowBackIcon className={"back-Icon"}/>
            <h1 className="button-Text">Contact List</h1>
        </button>
        <div className={"addPictureContainer"}>
          <img src={addLogo} className={"addPicture"}/>
        </div>
        <div className={"addInputContainers"}>
          <div className={"addInputContainer"}>
            <input className={"addInput"} value={firstName} placeholder={"First Name..."} onChange={(text)=>{
              setChangeMade(true);
              setFirstName(text.target.value)
            }}/>
          </div>
          <div className={"addInputContainer"}>
            <input className={"addInput"} value={lastName} placeholder={"Last Name..."}onChange={(text)=>{
              setChangeMade(true);
              setLastName(text.target.value)}
            }/>
          </div>
          <div className={"addInputContainer"}>
            <input className={"addInput"} value={phoneNumber} placeholder={"Phone Number..."} onChange={(text)=>{
              setChangeMade(true);
            setPhoneNumber(text.target.value)
            }}/>
          </div>
          <div className={"addInputContainer"}>
            <input className={"addInput"} value={email} placeholder={"Email Address..."} onChange={(text)=>{
              setChangeMade(true);
              setEmail(text.target.value)
            }}/>
          </div>
          <button className={changeMade?"addButton":"hideButton"} onClick={()=>{saveNewContact()}}>
            <h1 className="buttonText">Add Contact</h1>
          </button>
        </div>
       </Box>
    </React.Fragment>
  )
}