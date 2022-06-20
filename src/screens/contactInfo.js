import React ,{useEffect,useState}from "react";
import './contactInfo.css';
import SearchBar from "../components/SearchBar/SearchBar";
import ContactCard from "../components/ContactCard/ContactCard";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import data from '../Assets/Data/MOCK_DATA.json';
import { setContacts } from '../actions/contactActions';
import logo from '../Assets/Images/Profile-1.png';



export default function ContactInfo() {
    const { contactId } = useParams();
    const contact=useSelector(state => state.contactsReducer[0]&&state.contactsReducer[0].filter((contact,index)=>{
        console.log(contactId)
        console.log(contact,index)
        return index===parseInt(contactId)}))||[];
    console.log(contact);
    const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactsReducer[0])||[];
  const [loading,setLoading] = useState(false)
  const getData = () => data
  useEffect(() => {
    setLoading(true)
    if(!contacts||contacts.length === 0){
      dispatch(setContacts(getData()))
    }
    setLoading(false)
  }, [])
  return( 
    <React.Fragment>
        <div className="container">
            <div className={"pictureContainer"}>
                <img src={logo} className={"profilePicture"}/>
            </div>
        </div>
    </React.Fragment>
  )
}