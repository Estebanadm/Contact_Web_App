const contactsReducer=(state=[],payload)=>{
    switch(payload.type){
        case 'ADD_CONTACT':
            return [...state,payload.contact];
        case 'SET_CONTACT_LIST':
            return [...state,payload.contacts];
        case 'DELETE_CONTACT':
            return [...state,payload.contact];
        default:
             return state;
    }
  }
    export default contactsReducer;