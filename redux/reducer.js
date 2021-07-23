


const reducer = (state = {}, action) =>{
switch (action.type) {
    case 'add':
         return action.payload;
    case "delete":
        return {}    
    default:
        return state
        
}
}



export default reducer
