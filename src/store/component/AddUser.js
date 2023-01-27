import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { add } from '../action/userAction';
import { UserAddApi} from '../redux/api';
import {  useDispatch} from 'react-redux';

const AddUser=({trigger, setTrigger}) =>{

  const dispatch = useDispatch();

  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [phone, setPhone]= useState('');
  const [website, setWebsite]= useState('');

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

    const handleOk=async()=>{
      let res = await UserAddApi({
        name: name,
        email: email,
        phone: phone,
        website: website,
      });
      if (res.status===201){
        dispatch(add(res.data));
        setName('');
        setEmail('');
        setPhone('');
        setWebsite('');
        setTrigger(false)
      }
    }

    return trigger?(
        <div>
            <Modal
            open={trigger}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Add User
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                <TextField name="name" id="standard-basic-name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField name="email" id="standard-basic-email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <TextField name="phone" id="standard-basic-gender" label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <TextField name='website' id="standard-basic-status" label="Website" variant="outlined" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                </Typography>
                <Typography>
                <Button variant="outlined" onClick={()=>{setTrigger(false)}}>Cancel</Button>
                <Button variant="contained" onClick={handleOk}>Add</Button>

                </Typography>
            </Box>
            </Modal>
        </div>
    ):('')
}

export default AddUser
