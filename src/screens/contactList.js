import './contactList.css'
import React, { useEffect, Fragment, useState } from 'react'
import data from '../Assets/Data/MOCK_DATA.json'
import Box from '@mui/material/Box'
import SearchBar from '../components/SearchBar/SearchBar';
import ContactCard from '../components/ContactCard/ContactCard';
import { useSelector, useDispatch } from 'react-redux';
import { setContacts } from '../actions/contactActions';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";


function ContactList() {
  let navigate = useNavigate(); 
  const navigateToContactInfo = (index) => {
    navigate(`/contactInfo/${index}`);
  };
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
  console.log(contacts);
  return (
      <div >
        <style>{'body {background-color:#89B0AE'}</style>
            <div className={'headerContainer'}>
                <SearchBar/>
            </div>
            <div className={'contactsContainer'}>
                {contacts.length > 0 && data.map((contact, index) => {
                  return(
                    <Fragment key={index}>
                      <button >
                        <ContactCard 
                          firstName={contact.first_name} 
                          lastName={contact.last_name} 
                          phoneNumber={contact.phoneNumber} 
                          id={index}
                          onContactClick={()=>{
                            navigateToContactInfo(index)
                          }}
                        />
                      </button>
                    </Fragment>
                  )
                })}
            </div>
      </div>
  )
}

export default ContactList;