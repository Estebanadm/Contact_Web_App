
export const addToContacts=(contact)=>{
    console.log("adding : ",contact);
    return{
        type:'ADD_CONTACT',
        contact
    }
}
export const setContacts=(contacts)=>{
    console.log("Setting: ",contacts);
    return{
        type:'SET_CONTACT_LIST',
        contacts:contacts
    }
}
export const deleteContact=(contact)=>{
    console.log("Setting: ",contact);
    return{
        type:'SELECT_CONTACT',
        contact
   }
}