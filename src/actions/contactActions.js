export const addToContacts = (contact) => {
  return {
    type: "ADD_CONTACT",
    contact: contact,
  };
};
export const editContact = (contact) => {
  return {
    type: "EDIT_CONTACT",
    contact,
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
