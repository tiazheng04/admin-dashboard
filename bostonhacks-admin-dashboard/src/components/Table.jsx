import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


// Table component to list all the data
// Utilizes material-ui's DataGrid component

const Table = ({ rows, columns, pageSize=25, pageSizeOptions}) => {
  return (
    <DataGrid 
      rows={rows} 
      columns={columns} 
      pageSizeOptions={pageSizeOptions}
      initialState={{
        pagination: { paginationModel: { pageSize: pageSize } },
      }}
    />
  )
}

export default Table