import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import data from './Assets/Data/MOCK_DATA.json'
import { bindActionCreators } from 'redux';

function App() {
  const getData=()=>data;
  useEffect(() => {
    //TODO:If the state is empty then get the information from the data json
    //and dispatch it to the state
    const data=getData();
    console.log(data);
  }, []);
  return (
    <div className="App">
        <h1></h1>
    </div>
  );
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

export default connect(mapStateToProps,mapDispatchToProps)(contactCards);