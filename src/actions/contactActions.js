import { appStore } from "..";

export const addToContacts = (contact) => {
  return {
    type: "ADD_CONTACT",
    contact: contact,
  };
};
export const editContact = (contact) => {
  return {
    type: "EDIT_CONTACT",
    contacts: appStore.getState().contactsReducer.map((item, i) => {
      if (i === parseInt(contact.id)) {
        item.first_name = contact.first_name;
        item.last_name = contact.last_name;
        item.phoneNumber = contact.phoneNumber;
        item.email = contact.email;
      }
      return item;
    }),
  };
};
export const setContacts = (contacts) => {
  return {
    type: "SET_CONTACT_LIST",
    contacts,
  };
};
export const deleteContact = (id) => {
  return {
    type: "DELETE_CONTACT",
    id,
  };
};
