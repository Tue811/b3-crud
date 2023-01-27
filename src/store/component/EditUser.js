import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {  UserEditApi} from '../redux/api';
import {  useDispatch} from 'react-redux';
import {edit} from '../action/userAction'
function EditUser({trigger, setTrigger ,listData, id}) {
    const dispatch = useDispatch();
    
    const editUser = listData?.filter((item) =>item.id === id)
    const {name, email, website, phone} = editUser[0];
    const [value, setValue]=useState({
      name,email,website,phone
    });
    

      const style = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
      };
  
      const handleClose = () => setTrigger(false);

  
      const handleOk =async () => {
        let res = await UserEditApi(id,
          {name: value.name,
          email: value.email,
          phone: value.phone,
          website: value.website,});
       
        
        if(res.status===200){
          dispatch(edit({
            id: id,
            name: value.name,
            email: value.email,
            phone: value.phone,
            website: value.website,
          }));
          setTrigger(false)
        }
        
        };
  return trigger ? (
    <div>
            <Modal
            open={trigger}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit User
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                <TextField name="name" id="standard-basic-name" label="Name" variant="outlined" value={value.name} onChange={(e) => setValue({...value,name: e.target.value})} />
                <TextField name="email" id="standard-basic-email" label="Email" variant="outlined" value={value.email} onChange={(e) => setValue({...value,email: e.target.value})}/>
                <TextField name="phone" id="standard-basic-gender" label="Phone" variant="outlined" value={value.phone} onChange={(e) => setValue({...value,phone: e.target.value})}/>
                <TextField name="website" id="standard-basic-status" label="Website" variant="outlined" value={value.website} onChange={(e) => setValue({...value,website: e.target.value})}/>
                </Typography>
                <Typography>
                <Button variant="outlined" onClick={()=>{setTrigger(false)}}>Cancel</Button>
                <Button variant="contained" onClick={() => handleOk()}>Ok</Button>

                </Typography>
            </Box>
            </Modal>
        </div>
    ):('')
  
}

export default EditUser