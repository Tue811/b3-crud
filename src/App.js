
import './App.css';
import * as React from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, IconButton } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { UserApi, UserDeleteApi } from './store/redux/api';
import { useSelector, useDispatch} from 'react-redux';
import { getList, deleteUser } from './store/action/userAction';
import AddUser from './store/component/AddUser';
import EditUser from './store/component/EditUser';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';


function App() {
const listUser = useSelector((state) => state?.userReducer?.data) || [];
const dispatch = useDispatch();
const [isModalOpen, setIsModalOpen] = useState(false);
const [openEdit, setOpenEdit]=useState(false)
const [pageCount, setPageCount] = useState(0);
const [page, setPage] = React.useState(0);


const [userSelected, setUserSelected]=useState('');




const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

// const handleChangeRowsPerPage = (event) => {
//   setRowsPerPage(parseInt(event.target.value, 10));
//   setPage(0);
// };

const getListUsers = async () => {
  let res = await UserApi();
  if(res.status === 200) {
  dispatch(getList(res.data));

  }
}
const handleDelete= async(id)=>{
  let res= await UserDeleteApi(id)
  if(res.status===200){
    dispatch(deleteUser(id))
  }
}

React.useEffect(() => {
  getListUsers();
},[]) 
console.log('listUser', listUser)
  return (
  <div>
    <Typography variant="h4" align="center" sx={{mb: 10}}>
        List User
        <h1>Happy New Year 2023!</h1>
     </Typography>
     <Button variant="contained" onClick={() => setIsModalOpen(true)} >Add</Button>
     <TableContainer component={Paper}>
     <Table sx={{ minWidth: 650 }} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>ID</TableCell>
           <TableCell align="right">Name</TableCell>
           <TableCell align="right">Email</TableCell>
           <TableCell align="right">Phone</TableCell>
           <TableCell align="right">Website</TableCell>
           <TableCell align="center">Action</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {listUser.map((item) => (
          <TableRow
           key={item.name}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
           <TableCell component="th" scope="row">
             {item.id}
           </TableCell>
           <TableCell align="right">{item.name}</TableCell>
           <TableCell align="right">{item.email}</TableCell>
           <TableCell align="right">{item.phone}</TableCell>
           <TableCell align="right">{item.website}</TableCell>
           <TableCell align="center">
                   <AddToPhotosIcon onClick={() => setIsModalOpen(true)} />
                   <EditIcon color="primary" sx={{ ml : 2 , mr: 1}} onClick={() => {
                     setOpenEdit(true); 
                     setUserSelected(item.id)
                     }} />
                   <DeleteIcon color="error" onClick={() => handleDelete(item.id)} /> 
               </TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer>
 <AddUser trigger={isModalOpen} setTrigger={setIsModalOpen}></AddUser>
 {openEdit && listUser?.length && 
  <EditUser trigger={openEdit} setTrigger={setOpenEdit} listData={listUser} id={userSelected}></EditUser>
 }
  </div>
  );
}

export default App;
