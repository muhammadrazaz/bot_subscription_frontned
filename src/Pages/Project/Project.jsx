import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import Loader from '../../Components/Loader/Loader'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import { subDays } from 'date-fns'
import CustomDatePicker from '../../Components/CustomDatePicker/CustomDatePicker'
import axios from '../../Api/axios'


export default function Project() {
  const [loader, setLoader] = useState(false)
  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])

  const [tableData,setTableData] = useState({
    columns: [
      {
        label: 'ID',
        field: 'id',

      },
      {
        label: 'Project Name',
        field: 'project_name',

      },
      {
        label: 'Total Tasks',
        field: 'total_tasks',

      },
      {
        label: 'Total Cost',
        field: 'total_cost'
      },
      {
        label: 'Total Developer',
        field: 'total_developers',

      },
      
    ]
  })


  useEffect(()=>{
    getProjectsApi()
  },[])

  const getProjectsApi = () =>{
    setLoader(true)

    axios.get('developer/project/')
    .then(response =>{
      console.log(response)
      setTableData(prevState =>({
        ...prevState,
        'rows':response.data.projects
      }))
      setLoader(false)
    }).catch(error =>{
      console.log(error)
      setLoader(false)
    })
  }
  return (
    <BasePage title="Projects">
      {loader && <Loader />}

      <div className="row">
        <div className="col-sm-2">
          <CustomDatePicker dates={dates} setDates={setDates} />
        </div>
        <div className="col-sm-2">
        
        </div>
        <div className="col-sm-8 text-end">


          {/* <DownloadButton data={tableData} filename="EarningReport.csv" /> */}

        </div>

        <div className='desktop' style={{ height: '95%' }}>
          <TableWithPagination data={tableData} />
        </div>
      </div>
    </BasePage>
  )
}
