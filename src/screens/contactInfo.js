import React ,{useEffect,useState}from "react";
import './contactInfo.css';
import SearchBar from "../components/SearchBar/SearchBar";
import ContactCard from "../components/ContactCard/ContactCard";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import data from '../Assets/Data/MOCK_DATA.json';
import { editContact, setContacts } from '../actions/contactActions';
import logo from '../Assets/Images/Profile-1.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";



export default function ContactInfo() {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const contact=useSelector(state => state.contactsReducer[0]&&state.contactsReducer[0].filter((contact)=>{
        return contact.id===contactId}))||[];
    const contactInfo=contact[0]||{};
    const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactsReducer[0])||[];
  const [firstName,setFirstName] = useState(contactInfo.first_name);
  const [lastName,setLastName] = useState(contactInfo.last_name);
  const [phoneNumber,setPhoneNumber] = useState(contactInfo.phoneNumber);
  const [email,setEmail] = useState(contactInfo.email);
  const [changeMade,setChangeMade] = useState(false);
  console.log(firstName,lastName,phoneNumber,email);
  const goBack = () => {navigate(`/`);}
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
  const saveContactInformation=()=>{
    const validPhoneNumber = validatePhoneNumber(phoneNumber);
    const validEmail = validateEmail(email);
    const newContact={
      first_name:firstName,
      last_name:lastName,
      phoneNumber:validPhoneNumber,
      email:email
    }
    if(validPhoneNumber && validEmail){
    dispatch(editContact(newContact,parseInt(contactId)));
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
  
  const getData = () => data
  useEffect(() => {
    if(!contacts||contacts.length === 0){
      dispatch(setContacts(getData()))
    }
  }, [])
  return( 
    <React.Fragment>
        <div>
            <div className={"pictureContainer"}>
                <button className={"backButton"} onClick={()=>{goBack()}}>
                    <ArrowBackIcon className={"backIcon"}/>
                    <h1 className="buttonText">Contact List</h1>
                </button>
                <img src={logo} className={"infoPicture"}/>
            </div>
            <div className={"contactInfoContainer"}>
              <div className={"contactInput"}>
                <h1 className="infoText">First Name: </h1>
                <input className={"textInput"} value={firstName} onChange={(text)=>{
                    setChangeMade(true);
                    setFirstName(text.target.value)
                  }}/>
              </div>
              <div className={"contactInput"}>
                <h1 className="infoText">Last Name: </h1>
                <input className={"textInput"} value={lastName} onChange={(text)=>{
                    setChangeMade(true);
                    setLastName(text.target.value)}
                  }/>
              </div>
              <div className={"contactInput"}>
                <h1 className="infoText">Phone Number: </h1>
                <input className={"textInput"} value={phoneNumber} onChange={(text)=>{
                      setChangeMade(true);
                      setPhoneNumber(text.target.value)
                    }}/>
              </div>
              <div className={"contactInput"}>
                <h1 className="infoText">Email Address: </h1>
                <input className={"textInput"} value={email} onChange={(text)=>{
                      setChangeMade(true);
                      setEmail(text.target.value)
                    }}/>
              </div>
              <button className={changeMade?"addEditButton":"hideButton"} onClick={()=>saveContactInformation()}>
                <h1 className="buttonText">Save Changes</h1>
              </button>
            </div>
        </div>
    </React.Fragment>
  )
}