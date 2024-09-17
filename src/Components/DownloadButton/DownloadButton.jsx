import React from 'react'
import './DownloadButton.css'
import downloadIcon from '../../Assets/download-icon.svg'
import { CSVLink } from "react-csv";
import { MDBTooltip } from 'mdb-react-ui-kit';


export default function DownloadButton(props) {

  var columns = []
  var data = []

  if(props.data.length && props.columns.length){

    data = props.data

    for (let i = 0; i < props.columns.length; i++) {

      if (props.columns[i].dataField !== 'action' && props.columns[i].dataField !== 'details' && props.columns[i].dataField !== 'productImage' && props.columns[i].dataField !== 'cnicImage' && props.columns[i].dataField !== 'status') {

        columns.push({ label: props.columns[i].dataField, key: props.columns[i].dataField })
      }
    }

  }
  else{
    if (props.data !== undefined) {
      if (props.data.columns !== undefined) {
  
        for (let i = 0; i < props.data.columns.length; i++) {
          if (props.data.columns[i].field !== 'action' && props.data.columns[i].field !== 'details' && props.data.columns[i].field !== 'productImage' && props.data.columns[i].field !== 'cnicImage' && props.data.columns[i].field !== 'status') {
  
            columns.push({ label: props.data.columns[i].label, key: props.data.columns[i].field })
          }
  
        }
  
        if (props.data.rows !== undefined) {
          data = props.data.rows;
        }
      }
  
  
  
  
  
    }
  }

  


  const csvReport = {
    data: data,
    headers: columns,
    filename: props.filename
  };
  // console.log(props.data.columns.length,'00000000000000000')
  return (


    <CSVLink  {...csvReport} >
      <MDBTooltip tag='span' wrapperClass="" title="Download Report" placement='bottom'>
        <button className={'download-button ' + props.className} style={props.style}><svg width="20" height="27" viewBox="0 0 20 27" xmlns="http://www.w3.org/2000/svg"><path d="M19.2656 5.10313L14.8969 0.734375C14.4281 0.265625 13.7927 0 13.1318 0H2.49948C1.11979 0.00520833 0 1.125 0 2.50469V24.1672C0 25.5469 1.11979 26.6667 2.49948 26.6667H17.5005C18.8802 26.6667 20 25.5469 20 24.1672V6.87344C20 6.2125 19.7344 5.57188 19.2656 5.10313ZM13.3349 1.6974C13.4807 1.73385 13.6109 1.80677 13.7203 1.91615L18.0891 6.2849C18.1984 6.39427 18.2714 6.52448 18.3078 6.67031H13.3349V1.6974ZM18.3339 24.1672C18.3339 24.6255 17.9589 25.0005 17.5005 25.0005H2.49948C2.04115 25.0005 1.66615 24.6255 1.66615 24.1672V2.50469C1.66615 2.04635 2.04115 1.66667 2.49948 1.66667H11.6682V7.08698C11.6682 7.77969 12.2255 8.33333 12.9182 8.33333H18.3339V24.1672ZM6.25 13.3333H5.83333C4.4526 13.3333 3.33333 14.4526 3.33333 15.8333V17.5C3.33333 18.8807 4.4526 20 5.83333 20H6.25C6.48021 20 6.66667 19.8135 6.66667 19.5833V18.75C6.66667 18.5198 6.48021 18.3333 6.25 18.3333H5.83333C5.37292 18.3333 5 17.9604 5 17.5V15.8333C5 15.3729 5.37292 15 5.83333 15H6.25C6.48021 15 6.66667 14.8135 6.66667 14.5833V13.75C6.66667 13.5198 6.48021 13.3333 6.25 13.3333ZM12.0833 13.3333C11.8531 13.3333 11.6667 13.5198 11.6667 13.75V14.8333C11.6667 16.6812 12.3375 18.4214 13.5562 19.7339C13.7135 19.9031 13.9349 20 14.1667 20C14.3984 20 14.6198 19.9031 14.7771 19.7339C15.9964 18.4214 16.6667 16.6812 16.6667 14.8333V13.75C16.6667 13.5198 16.4802 13.3333 16.25 13.3333H15.4167C15.1865 13.3333 15 13.5198 15 13.75V14.8333C15 15.8891 14.7031 16.9255 14.1667 17.7958C13.6302 16.926 13.3333 15.8891 13.3333 14.8333V13.75C13.3333 13.5198 13.1469 13.3333 12.9167 13.3333H12.0833ZM9.34635 15.5453C9.27448 15.4833 9.23594 15.4125 9.23594 15.3453C9.23594 15.1828 9.46771 15.0005 9.77812 15.0005H10.4167C10.6469 15.0005 10.8333 14.8141 10.8333 14.5839V13.7505C10.8333 13.5203 10.6469 13.3339 10.4167 13.3339H9.7776C8.55937 13.3339 7.56875 14.2365 7.56875 15.3453C7.56875 15.9005 7.82187 16.4349 8.26302 16.8109L9.40312 17.7885C9.475 17.8505 9.51354 17.9214 9.51354 17.9885C9.51354 18.151 9.28177 18.3333 8.97135 18.3333H8.33333C8.10312 18.3333 7.91667 18.5198 7.91667 18.75V19.5833C7.91667 19.8135 8.10312 20 8.33333 20H8.9724C10.1906 20 11.1812 19.0974 11.1812 17.9885C11.1812 17.4333 10.9281 16.899 10.487 16.5229L9.34635 15.5453Z"></path></svg>
        <span className='font-2 macan-semibold ps-2 text-black' >{props.title?props.title:'Download report'}</span>
        </button>
      </MDBTooltip>
    </CSVLink>





  )
}
