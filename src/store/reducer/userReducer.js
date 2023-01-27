import { ADD, DELETEUSER, EDIT, LIST } from "../../contants/userContant";
import cloneDeep from 'lodash/cloneDeep';
const initialState = {
    data:[],
    
};

function userReducer(state = initialState, action) {
    // const { type, payload } = action;
    
    switch (action.type) {
      case LIST :
        return {...state, data:action.payload};
        
        case ADD:
        let newState = cloneDeep(state);
        const payload=action.payload;
        newState.data.push(payload);
        return  newState;


      case EDIT:
        let newStateEdit= cloneDeep(state);
        const editState=action.payload;
        return {data: newStateEdit.data.map(el=>el.id===editState.id ? editState : el)};


      case DELETEUSER:
        let newStateDelete = cloneDeep(state);
        const deleteState=action.payload;
        newStateDelete=newStateDelete.data.filter((el) => el.id !== deleteState);    
        return {data: newStateDelete};
    
      default:
        return state;
    }
  };
  
  export default userReducer;
