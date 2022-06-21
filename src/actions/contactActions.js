import { appStore } from "..";
export const addToContacts=(contact)=>{
    console.log("adding : ",contact);
    return{
        type:'ADD_CONTACT',
        contact: appStore.getState().contactsReducer[0].push(contact)
    }
}
export const editContact=(contact,index)=>{
    console.log("editing : ",contact);
    return{
        type:'EDIT_CONTACT',
        contacts: appStore.getState().contactsReducer[0].map((item,i)=>{
            if(i===index){
                item.first_name=contact.first_name; 
                item.last_name=contact.last_name;
                item.phoneNumber=contact.phoneNumber;
                item.email=contact.email;
            }
            return item
        })
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