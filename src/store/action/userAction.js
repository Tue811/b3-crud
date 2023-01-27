
import {ADD, DELETEUSER, LIST, EDIT} from '../../contants/userContant';

export function getList(payload) {
      return {
            type: LIST,
            payload : payload, 
          };


  }

  export function add(payload){
      return{
            type: ADD,
            payload: payload,
      }
  }

  export function edit(payload){
      return{
            type: EDIT,
            payload: payload,
      }
  }

  export function deleteUser(id){
      return{
            type: DELETEUSER,
            payload: id,
      }
  }