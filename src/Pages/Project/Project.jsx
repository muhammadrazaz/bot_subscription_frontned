import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import Loader from '../../Components/Loader/Loader'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import { subDays } from 'date-fns'
import CustomDatePicker from '../../Components/CustomDatePicker/CustomDatePicker'
import axios from '../../Api/axios'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Project() {
  const [loader, setLoader] = useState(false)
  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
  const [isAdd, setIsAdd] = useState()
  const [projectData, setProjectData] = useState({})
  const [errors, setErrors] = useState({})
  const [tableData, setTableData] = useState({
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
      {
        label: 'Latest Files',
        field: 'latest_files',

      },
      {
        label: 'Created Date',
        field: 'date',

      },
      {
        label: 'Action',
        field: 'details',

      },

    ]
  })


  useEffect(() => {
    getProjectsApi()
  }, [dates])


  const handleProjectDataChange = (e) => {
    const { name, value } = e.target
    setProjectData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const getProjectsApi = () => {
    setLoader(true)

    axios.get('developer/project/',{
      params :{
        dates:dates
      }
    })
      .then(response => {
        console.log(response)

        const data = response.data.projects

        for(let i=0;i<data.length;i++){
          data[i]['details'] = <Link to={"/projects/detail/"+data[i].id}> Details </Link>
        }
        setTableData(prevState => ({
          ...prevState,
          'rows': data
        }))
        setLoader(false)
      }).catch(error => {
        console.log(error)
        setLoader(false)
      })
  }

  const addProjectApi = (e) => {
    e.preventDefault()
    setLoader(true)
    axios.post('developer/project/', projectData)
      .then(response => {
        console.log(response)
        setErrors({})
        setProjectData({})
        setLoader(false)
        setIsAdd(false)
        getProjectsApi()
      }).catch(error => {
        console.log(error)
        if (error.response.status == 400) {
          setErrors(error.response.data)
        }
        setLoader(false)
      })

  }
  return (
    <BasePage title="Projects">
      {loader && <Loader />}

      <div className="row">
        <div className="col-md-2 my-1">
          <CustomDatePicker dates={dates} setDates={setDates} />
        </div>
        <div className="col-md-6 my-1">

          <button className='btn btn-dark pt-2 pb-2 m-0 h-100 ms-md-3' onClick={() => { setIsAdd(true) }}>Add New</button>

        </div>
        <div className="col-md-4 text-end my-1">


          {/* <DownloadButton data={tableData} filename="EarningReport.csv" /> */}

        </div>

        <div  style={{ height: '95%' }}>
          <TableWithPagination data={tableData} />
        </div>
      </div>

      <Modal
        show={isAdd}
        onHide={() => { setIsAdd(false) }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >

        <Modal.Body style={{ maxHeight: "80vh", overflow: 'auto' }}>

          <div className='p-3 h-100' >
            <p className='text-center font-1 macan-bold'>Add New Project</p>

            <form onSubmit={addProjectApi} className='p-2'>
              <div className="w-100 p-2">

                <input type="text" name="project_name" placeholder="Client Name" value={projectData['project_name']} onChange={handleProjectDataChange} className={'form-control input-field m-0 ' + (errors.project_name ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.project_name}
                </div>
              </div>



              <div className="w-100 text-center mt-2">
                <button type='submit' className='btn btn-dark pt-2 pb-2 m-0 ms-3 font-2 macan-bold'>Save</button>
              </div>
            </form>





          </div>







        </Modal.Body>

      </Modal>
    </BasePage>
  )
}
