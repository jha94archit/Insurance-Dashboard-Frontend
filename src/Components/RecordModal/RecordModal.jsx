import {React, useState} from 'react';
import Box from '@mui/material/Box';
import './recordModal.css'
import { policyEps } from '../../Context/API';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { makeStyles, TextField } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: '#EEEEEE',
  boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
  p: 4,
};

const useStyles = makeStyles({
    field: {
        marginTop:15,
        marginBottom: 15,
        display: 'block'
    },
    label: {
        marginBottom: 8,
        marginTop: 15
    }
})

export default function RecordModal({open, handleClose, data, setDataUpdated, setSnackBarSuccess, setSnackBarFailure}) {
    const classes = useStyles()
    const [formData, setFormData] = useState(data)

    const URL = `${policyEps.fetchSinglePolicyData}${formData.policy_id}/`
    const error = (formData.premiun === 0 || formData.premiun > 999999)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleChangeNested = (e) => {
            const {name, value} = e.target;
            setFormData({...formData, 
                customer_region:{
                ...formData.customer_region,
              [name]: value,},
                fuel:{
                ...formData.fuel,
              [name]: value,},
                vehicle_segment:{
                ...formData.vehicle_segment,
              [name]: value,},
                customer_income_group:{
                ...formData.customer_income_group,
              [name]: value,},

            });
    };

    function handleSubmit(e){
        e.preventDefault();
        if (error) {
          return setSnackBarFailure(true)
        }
        axios.patch(URL, JSON.stringify(formData), {headers: {
            "Content-Type": "application/json"}})
        .then(handleClose, setDataUpdated(true), setSnackBarSuccess(true))
    }


  return (
    <div>
      <Modal
        onClose={handleClose}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" onClose={handleClose} sx={{ ml:2}}>
            Policy Details
          </Typography>
          <div >
          <form noValidate autoComplete="off" className="record-form">
              <div className="left-side">
              <TextField id="outlined-basic" label="Policy ID" variant="outlined" disabled className={classes.field} fullWidth value={formData.policy_id} name="policy_id" onChange={handleChange}/>
                <TextField id="outlined-basic" label="Date of Purchase" variant="outlined" disabled className={classes.field} fullWidth value={formData.date_of_purchase} name="date_of_purchase" onChange={handleChange}/>
                <TextField id="outlined-basic" label="Customer ID" variant="outlined" disabled className={classes.field} fullWidth value={formData.customer_id} name="date_of_purchase" onChange={handleChange}/>
                <TextField 
                  id="outlined-basic" 
                  label="Premium" 
                  variant="outlined" 
                  type="number" 
                  className={classes.field} 
                  fullWidth 
                  value={formData.premiun} 
                  name="premiun" 
                  onChange={handleChange}
                  error={error}
                  helperText={error ? "Premium cannot be 0 or more than 999999" : ""}
                  />
                <InputLabel className={classes.label}>Region</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.customer_region.region}
                        label="Region"
                        fullWidth
                        onChange={handleChangeNested}
                        name="region"
                        >
                        <MenuItem value={'North'}>North</MenuItem>
                        <MenuItem value={'South'}>South</MenuItem>
                        <MenuItem value={'East'}>East</MenuItem>
                        <MenuItem value={'West'}>West</MenuItem>
                        </Select>
                <InputLabel className={classes.label}>Income Group</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.customer_income_group.income_group}
                        label="Income Group"
                        fullWidth
                        onChange={handleChangeNested}
                        name="income_group"
                        >
                        <MenuItem value={'0- $25K'}>0- $25K</MenuItem>
                        <MenuItem value={'$25-$70K'}>$25-$70K</MenuItem>
                        <MenuItem value={'>$70K'}>$70K +</MenuItem>
                        </Select>
                        <InputLabel className={classes.label}>Marital Status</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.customer_marital_status}
                        label="Marital Status"
                        fullWidth
                        onChange={handleChange}
                        name="marital_status"
                        >
                        <MenuItem value={true}>Married</MenuItem>
                        <MenuItem value={false}>Un-Married</MenuItem>
                        </Select>
                        <InputLabel className={classes.label}>Gender</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.gender}
                        label="Gender"
                        fullWidth
                        onChange={handleChange}
                        name="gender"
                        >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                </div>
                <div className="right-side">
                    <InputLabel className={classes.label}>Fuel</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.fuel.type}
                        label="Fuel"
                        fullWidth
                        onChange={handleChangeNested}
                        name="type"
                        >
                        <MenuItem value={'CNG'}>CNG</MenuItem>
                        <MenuItem value={'Petrol'}>Petrol</MenuItem>
                        <MenuItem value={'Diesel'}>Diesel</MenuItem>
                        </Select>
                    <InputLabel className={classes.label}>Vehicle Segment</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.vehicle_segment.segment}
                        label="Vehicle Segment"
                        fullWidth
                        onChange={handleChangeNested}
                        name="segment"
                        >
                        <MenuItem value={'A'}>A</MenuItem>
                        <MenuItem value={'B'}>B</MenuItem>
                        <MenuItem value={'C'}>C</MenuItem>
                        </Select>
                    <InputLabel className={classes.label}>Body Injury Liability</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.bodily_injury_liablility}
                        label="Body Injury Liability"
                        fullWidth
                        onChange={handleChange}
                        name="bodily_injury_liablility"
                        >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        </Select>
                    <InputLabel className={classes.label}>Personal Injury Liability</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.personal_injury_protection}
                        label="Personal Injury Liability"
                        fullWidth
                        onChange={handleChange}
                        name="personal_injury_protection"
                        >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        </Select>
                    <InputLabel className={classes.label}>Property Injury Liability</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.property_damage_liablility}
                        label="Property Liability"
                        fullWidth
                        onChange={handleChange}
                        name="property_damage_liablility"
                        >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        </Select>
                    <InputLabel className={classes.label}>Collision</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.collision}
                        label="Collision"
                        fullWidth
                        onChange={handleChange}
                        name="collision"
                        >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        </Select>
                    <InputLabel className={classes.label}>Comprehensive</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.comprehensive}
                        label="Comprehensive"
                        fullWidth
                        onChange={handleChange}
                        name="comprehensive"
                        >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        </Select>
                </div>
          </form>
          <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}