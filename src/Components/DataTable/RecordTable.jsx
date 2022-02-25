import {React, useState} from 'react'
import './recordTable.css'
// import MaterialTable from 'material-table';
// import { policyData } from '../../dummyData';
import DataTable from 'react-data-table-component'
import { TextField, Box } from '@material-ui/core';
import Search from '@mui/icons-material/Search';
import RecordModal from '../RecordModal/RecordModal';


const columns = [
    {name: 'Policy ID', selector: row => row.policy_id},
    {name: 'Date of Purchase', selector: row => row.date_of_purchase, sortable: true},
    {name: 'Customer ID', selector: row => row.customer_id},
    {name: 'Region',  selector: row => row.customer_region.region},
    {name: 'Premium',  selector: row => row.premiun, sortable: true},
  ];

const customeStyles = {
  cells: {
    style: {
        fontSize: '14px',
    },
  },
  headCells: {
    style: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
  }
}

export default function RecordTable({data, setDataUpdated, setSnackBarSuccess, setSnackBarFailure, pending}) {
  const [searchInput, setSearchInput] = useState("")
  const [modalData, setModalData] = useState()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setModalData('')
  }


    function search(rows) {
        return rows.filter(row => 
            row.policy_id.indexOf(searchInput) > -1 ||
            row.customer_id.indexOf(searchInput) > -1
        )}

  return (
    <div className="record-table">
      <div className="table-header">
        <h3 className="record-table-title">
          Policy Records
        </h3>
        <div className="search">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          variant="standard"
          label="Search"
          size="small"
          value={searchInput}
          onChange = {(e) => setSearchInput(e.target.value) }
        />
        </Box>
        </div>
        </div>
      <DataTable
        columns={columns} 
        data={search(data)} 
        pagination
        customStyles={customeStyles}
        highlightOnHover={true}
        pointerOnHover={true}
        onRowClicked = {(row) => {setModalData(row); handleOpen(true)}}
        progressPending={pending}
      />
      { modalData && <RecordModal 
                      open={open} 
                      handleClose={handleClose} 
                      data={modalData} 
                      setDataUpdated={setDataUpdated} 
                      setSnackBarSuccess={setSnackBarSuccess}
                      setSnackBarFailure={setSnackBarFailure}
                      />}
    </div>
  )
}
