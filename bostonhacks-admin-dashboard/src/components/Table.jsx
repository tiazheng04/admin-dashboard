import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


// Table component to list all the data
// Utilizes material-ui's DataGrid component

const Table = ({ rows, columns, pageSize=25, pageSizeOptions=[5, 10, 20, 50, 100] }) => {
  return (
    <DataGrid 
      rows={rows} 
      columns={columns} 
      pageSize={pageSize} 
      pageSizeOptions={pageSizeOptions}
      initialState={{
        pagination: { paginationModel: { pageSize: pageSize } },
      }}
      pagination 
    />
  )
}

export default Table