export const addToContacts = (contact) => {
  console.log('adding : ', contact);
  return {
    type: 'ADD_CONTACT',
    contact,
  };
};
