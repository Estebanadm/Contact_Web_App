const contactsReducer = (state = [], payload) => {
  switch (payload.type) {
    case "ADD_CONTACT":
      state.unshift(payload.contact);
      return state;
    case "SET_CONTACT_LIST":
      return [...state.concat(payload.contacts)];
    case "DELETE_CONTACT":
      return [...state.filter((contact) => contact.id !== payload.id)];
    case "EDIT_CONTACT":
      return [...payload.contacts];
    default:
      return state;
  }
};
export default contactsReducer;
