import React from 'react';
import './TableWithPagination.css'
import { MDBDataTable } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBTooltip } from 'mdb-react-ui-kit';


export default function TableWithPagination(props) {

      if(props.data){
        if(props.data.columns){
          props.data.columns.forEach(element => {
            element['sort'] = 'disabled'
            element['width'] = 20
          });
        }

      }
    
      return (
        <div className='h-100 py-3 w-100'>
          
        <div className=' table-with-pagination h-100 w-100'>
           <div className='h-100  w-100'>
           <MDBDataTable
           noBottomColumns={true}
          order='disabled'
          bordered
          small
          // striped
          
          data={props.data}
          
          
        />
           </div>
        </div>
        </div>
        
      );
    }

