import {useState} from 'react'
import { AgGridReact } from "ag-grid-react";

function Table({rowData,colDefs,onRowClicked}) {
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50, 100];


    return (
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact 
                rowData={rowData} 
                columnDefs={colDefs} 
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                onRowClicked={onRowClicked}
        />
        </div>
      );
}

export default Table