export default(state=[],payload)=>{
    switch(payload.type){
        case 'ADD_CONTACT':
            return [...state,payload.contact];
        default:
             return state;
    }
}