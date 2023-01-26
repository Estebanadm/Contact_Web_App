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
      return [
        ...state.map((contact) => {
          if (contact.id === payload.contact.id) {
            contact.first_name = payload.contact.first_name;
            contact.last_name = payload.contact.last_name;
            contact.phoneNumber = payload.contact.phoneNumber;
            contact.email = payload.contact.email;
          }
          return contact;
        }),
      ];
    default:
      return state;
  }
};
export default contactsReducer;
