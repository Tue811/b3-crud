// import { combineReducers } from 'redux';
// const defaultState="this is default Message! dispatch an action to change me"
// const reducers = combineReducers({
//   message: (state=defaultState, action) => {
//     return state;
//   },
// });

import { combineReducers } from "redux";
import  userReducer  from "../reducer/userReducer";

export const rootReducer = combineReducers({
     userReducer,
})
