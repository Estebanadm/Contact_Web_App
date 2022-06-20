/* eslint-disable no-unused-vars */
import './App.css'
import React, { useEffect, Fragment } from 'react'
import data from './Assets/Data/MOCK_DATA.json'
import Box from '@mui/material/Box'
import SearchBar from './components/SearchBar/SearchBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as contactActions from './actions/contactActions';
import ContactCard from './components/ContactCard/ContactCard';

function App () {
  const getData = () => data
  useEffect(() => {
    // TODO:If the state is empty then get the information from the data json
    // and dispatch it to the state
    const data = getData()
    console.log(data)
  }, [])
  return (
    <div >
      <style>{'body {background-color:#89B0AE'}</style>
      <div className={'container'}>
        <Box className={'boxContainer'}>
          <div className={'headerContainer'}>
              <SearchBar/>
          </div>
          <div className={'contactsContainer'}>
              {data.length > 0 && data.map((contact, index) => {
                return(
                  <Fragment key={index}>
                    <ContactCard firstName={contact.first_name} lastName={contact.last_name} phoneNumber={contact.phoneNumber} id={index}/>
                  </Fragment>
                )
              })}

          </div>
        </Box>
      </div>
    </div>
  )
}
function mapStateToProps(state){
  return {
      contacts:state.contacts
  }
}
function mapDispatchToProps(dispatch){
  return {
      action: bindActionCreators(contactActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
