'use client';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { Button, TextField, Box } from "@mui/material";

export default function DummyDataTable() {
  const [rowData, setRowData] = useState([]);
  const [formData, setFormData] = useState({
    acceptTerms: false,
    acceptTerms2: false,
    acceptTerms3: false,
    address: '',
    age: '',
    authProvider: '',
    bostonhacks: '',
    city: '',
    collegeYear: '',
    country: '',
    diet: '',
    educationLevel: '',
    email: '',
    ethnicity: '',
    firstName: '',
    gender: '',
    github: '',
    lastName: '',
    linkedin: '',
    major: '',
    otherDiet: '',
    phoneNumber: '',
    portfolio: '',
    pronouns: '',
    schoolLabel: '',
    schoolValue: '',
    shirtSize: '',
    sleep: false,
    state: '',
    status: '',
    uid: '',
    zipCode: ''
  });

  const columns = [
    { field: 'col1', headerName: 'ID', flex: 1, headerAlign: 'left' },
    { field: 'col2', headerName: 'Name', flex: 1, headerAlign: 'left'},
    { field: 'col3', headerName: 'College', flex: 1, headerAlign: 'left'},
    { field: 'col4', headerName: 'Status', flex: 1, headerAlign: 'left' },
    { field: 'col5', headerName: 'Actions', flex: 1, headerAlign: 'left', renderCell: (cellValues) => {
      return (
        <Stack direction="row" spacing={2}>
          <Button
            variant='contained'
            onClick={() => {
              console.log("Update clicked", cellValues.row);
              
            }}
          >
            Update
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              console.log("Delete clicked", cellValues.row);
            }}
          >
            Delete
          </Button>
        </Stack>
      );
    }}
  ];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const fetchData = async () => {
    try {
      const response = await fetch('api/applicants');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setRowData(data.map(applicant => ({
        id: applicant.id, col1: applicant.id, col2: applicant.firstName, col3: applicant.schoolValue, col4: applicant.status
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    // Construct the newEntry object with all mandatory fields of the Applicant model

    try {
      const response = await fetch('/api/add', { // make sure this endpoint is correct
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add new entry');
      }
  
      // Refresh the data grid
      await fetchData(); 
    } catch (error) {
      console.error('Error adding new entry:', error);
 
  

      // Handle the error in the UI if necessary
    }
  };
  
  


  return (
    <div style={{ height: '80%', width: '100%' }} className="justify-self-center">
      {/* Form for adding new entries (Added) */}
      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: "white" }}>
        {Object.keys(formData).map(key => (
          <TextField
            key={key}
            name={key}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/[A-Z]/g, letter => ` ${letter}`)}
            type={key.includes('Terms') || key === 'sleep' ? 'checkbox' : 'text'}
            value={formData[key]}
            onChange={handleChange}
            checked={key.includes('Terms') || key === 'sleep' ? formData[key] : undefined}
          />
        ))}
        <Button variant="contained" onClick={handleAdd}>Add Applicant</Button>
      </Box>
      <DataGrid
        rows={rowData}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        sx={{ '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': { backgroundColor: "white" } }}
      />
    </div>
  );
}
