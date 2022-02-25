import {React, useState, useEffect} from 'react'
import './home.css'
import ChartLine from '../../Components/Charts/ChartLine'
import RecordTable from '../../Components/DataTable/RecordTable';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import {policyEps} from '../../Context/API'

export default function Home() {

    const [policyData, setPolicyData] = useState([])
    const [monthlyData, setMonthlyData] = useState([])
    const [regionalData, setRegionalData] = useState([])
    const [dataUpdated, setDataUpdated] = useState(false)
    const [pending, setPending] = useState(true)
    const [snackBarSuccess, setSnackBarSuccess] = useState(false)
    const [snackBarFailure, setSnackBarFailure] = useState(false)

    const handleSnackCloseSuccess = () => setSnackBarSuccess(false)
    const handleSnackCloseFailure = () => setSnackBarFailure(false)

    const snackBarActionSuccess = (
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackCloseSuccess}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      );

    const snackBarActionFailure = (
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackCloseFailure}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      );


    useEffect(() => {
        async function fetchPolicyData() {
            const request = await axios.get(policyEps.fetchPolicyData);
            setPolicyData(request.data);
            setPending(false);
            setDataUpdated(false);
            return request
        } fetchPolicyData();
    }, [dataUpdated])


    useEffect(() => {
        async function fetchMonthlyData() {
            const request = await axios.get(policyEps.fetchMonthlyData);
            setMonthlyData(request.data)
            return request
        } fetchMonthlyData();
    }, [dataUpdated])

    useEffect(() => {
        async function fetchRegionalData() {
            const request = await axios.get(policyEps.fetchRegionalData);
            setRegionalData(request.data)
            return request
        } fetchRegionalData();
    }, [dataUpdated])

  return (
    <div className="home">
        <div className="chart-section">
            <ChartLine data={monthlyData} label="Policy by Month" datakey="month" dataval="policies"/>
            <ChartLine data={regionalData} label="Policy by Region" datakey="region" dataval="policies"/>
        </div>
        <div className="data-table-secton">
            <RecordTable 
                data={policyData} 
                setDataUpdated={setDataUpdated} 
                setSnackBarSuccess={setSnackBarSuccess} 
                setSnackBarFailure={setSnackBarFailure} 
                pending={pending}/>
        </div>
        <div>
        <Snackbar
            open={snackBarSuccess}
            sx={{ width: '25%' }}
            autoHideDuration={6000}
            onClose={handleSnackCloseSuccess}
            message="Data Saved Successfully!"
            action={snackBarActionSuccess}
        >
            <Alert onClose={handleSnackCloseSuccess} severity="success" sx={{ width: '100%' }}>
                Database Updated Successfully!
            </Alert>
        </Snackbar>
        <Snackbar
            open={snackBarFailure}
            sx={{ width: '25%' }}
            autoHideDuration={6000}
            onClose={handleSnackCloseFailure}
            message="Error Alert - Data cannot be updated!"
            action={snackBarActionFailure}
        >
            <Alert onClose={handleSnackCloseFailure} severity="error" sx={{ width: '100%' }}>
                Error Alert - Data cannot be updated!
            </Alert>
        </Snackbar>
    </div>
    </div>
  )
}
