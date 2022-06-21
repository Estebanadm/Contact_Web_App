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
    const contact=useSelector(state => state.contactsReducer[0]&&state.contactsReducer[0].filter((contact,index)=>{
        return index===parseInt(contactId)}))||[];
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
  const saveContactInformation=()=>{
    const newContact={
      first_name:firstName,
      last_name:lastName,
      phoneNumber:phoneNumber,
      email:email
    }
    dispatch(editContact(newContact,parseInt(contactId)));
    goBack();
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