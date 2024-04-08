"use client"

import Table from '@/components/Table'
import React, { useEffect, useState } from 'react'

// add more fields to columns to account for more fields in the database
// consider adding a global file that holds these columns
const applicantColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 600 }
];

const userColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 600 }
]

const page = () => {
    const [applicants, setApplicants] = useState([]);
    
    useEffect(() => {
        const fetchApplicants = async() => {
            const res = await fetch(`/api/applicants/all`);
            const data = await res.json();
            setApplicants(data);
            
            console.log(data);
        }
        
        try {
            fetchApplicants();
        } catch (error) {
            console.error(error);
        }
        
    }, []);


  return (
    <div className="flex flex-col bg-white text-black p-5">
        <div className='m-5'>
            <p className="text-xl">Applicants (More fields to come)</p>
            <Table rows={Object.values(applicants)} columns={applicantColumns} pageSize={25} pageSizeOptions={[5, 10, 20, 50, 100]}/>
        </div>
        <div className='m-5'>
            <p className='text-xl'>User (i think this means bhacks admins that control site)</p>
            <Table rows={[]} columns={userColumns} pageSize={25} pageSizeOptions={[5, 10, 20, 50, 100]}/>
        </div>
    </div>
    
  )
}

export default page