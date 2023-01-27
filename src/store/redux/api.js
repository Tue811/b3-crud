import axios from "axios";

export const UserApi = async () => 
    await axios.get("https://jsonplaceholder.typicode.com/users");

export const UserAddApi = async (data) => 
    await axios.post("https://jsonplaceholder.typicode.com/users",data);

export const UserEditApi= async(id, data)=>
    await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,data);
    
export const UserDeleteApi= async(id)=>
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      