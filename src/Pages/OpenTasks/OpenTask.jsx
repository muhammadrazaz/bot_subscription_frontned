import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import Loader from '../../Components/Loader/Loader'
import CustomDatePicker from '../../Components/CustomDatePicker/CustomDatePicker'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import { Modal } from 'react-bootstrap'
import { subDays } from 'date-fns'
import axios from '../../Api/axios'


export default function OpenTask() {
  const [loader, setLoader] = useState(false)
  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
  const [isAdd, setIsAdd] = useState()
  const [taskData, setTaskData] = useState({})
  const [errors, setErrors] = useState({})
  const [projects, setProjects] = useState([])
  const [developers, setDevelopers] = useState([])
  const [tableData, setTableData] = useState({
    columns: [
      {
        label: 'Task ID',
        field: 'id',

      },
      {
        label: 'Task Detail',
        field: 'task_detail',

      },
      {
        label: 'Task Detail Video',
        field: 'task_detail_video',

      },
      {
        label: 'Requirement Document',
        field: 'requirement_document'
      },
      {
        label: 'Task Timeline',
        field: 'task_timeline',

      },
      {
        label: 'Task Cost',
        field: 'task_cost',

      },

      {
        label: 'Remarks',
        field: 'remarks',

      },
      {
        label: 'Action',
        field: 'edit',

      },



    ]
  })


  useEffect(() => {
    getOpenTaskDataApi()
    getProjectsApi()
    getDeveloperApi()
  }, [])


  const handleTaskChange = (e) => {
    const { name, value } = e.target
    console.log(value)
    if (name === 'task_detail_video' || name === 'requirement_document' || name === 'instruction_video' || name === 'code_explanation_video' || name === 'latest_files') {

      setTaskData({
        ...taskData,
        [name]: e.target.files[0],
      });
    } else {
      setTaskData({
        ...taskData,
        [name]: value,
      });
    }

  }


  const handleEdit = (e) => {
    setIsAdd(true)
    setTaskData(JSON.parse(e.target.value))
  }


  const getOpenTaskDataApi = () => {
    setLoader(true)
    axios.get('/developer/open-task/').then(response => {
      console.log(response)
      const data = response.data
      for (let i = 0; i < data.length; i++) {
        data[i]['edit'] = <button value={JSON.stringify(data[i])} onClick={handleEdit}>Edit</button>
      }

      setTableData({
        ...tableData,
        'rows': response.data
      })
      setLoader(false)
    }).catch(error => {
      console.log(error)
      setLoader(false)
    })
  }

  const getProjectsApi = () => {
    setLoader(true)

    axios.get('developer/project/')
      .then(response => {
        console.log(response)

        setProjects(response.data.projects)
        setLoader(false)
      }).catch(error => {
        console.log(error)
        setLoader(false)
      })
  }

  const getDeveloperApi = () => {
    setLoader(true)

    axios.get('developers')
      .then(response => {
        console.log(response)

        setDevelopers(response.data)
        setLoader(false)
      }).catch(error => {
        console.log(error)
        setLoader(false)
      })
  }



  const addAndUpdateTask = (e) => {
    setLoader(true)
    e.preventDefault()
    
    const formData = new FormData();
    formData.append('id', 1 || '');
    formData.append('project', taskData.project || '');
    formData.append('task_detail', taskData.task_detail || '');
    formData.append('task_detail_video', taskData.task_detail_video || '');
    if (taskData.requirement_document instanceof File) {
      
      formData.append('requirement_document', taskData.requirement_document);
    } else {
      
      formData.append('requirement_document', '');
    }
    formData.append('task_timeline', taskData.task_timeline || '');
    formData.append('task_cost', taskData.task_cost || '');
    formData.append('remarks', taskData.remarks || '');
    formData.append('developer', taskData.developer || '');
    console.log(taskData.project)
    
    // formData.append('developer', taskData.developer || '');

    axios.post('/developer/open-task/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response)
        setTaskData({})
        setErrors({})
        setIsAdd(false)
        setLoader(false)
        getOpenTaskDataApi()
      }).catch(error => {
        console.log(error)
        if (error.response.status === 400) {
          setErrors(error.response.data)
        }
        setLoader(false)
      })
  }


  return (
    <BasePage title="Open Task">
      {loader && <Loader />}

      <div className="row">
        {/* <div className="col-md-2 my-1">
          <CustomDatePicker dates={dates} setDates={setDates} />
        </div> */}
        <div className="col-md-6 my-1">

          <button className='btn btn-dark pt-2 pb-2 m-0 h-100 ms-md-3' onClick={() => { setIsAdd(true) }}>Add New</button>

        </div>
        <div className="col-md-4 my-1 text-end">


          {/* <DownloadButton data={tableData} filename="EarningReport.csv" /> */}

        </div>

        <div  style={{ height: '95%' }}>
          <TableWithPagination data={tableData} />
        </div>
      </div>
      <Modal
        show={isAdd}
        onHide={() => { setIsAdd(false); setTaskData({}) }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >

        <Modal.Body style={{ maxHeight: "80vh", overflow: 'auto' }}>

          <div className='p-3 h-100' >
            <p className='text-center font-1 macan-bold'>Add or Update Task</p>

            <form onSubmit={addAndUpdateTask} className='p-2'>
              <div className="w-100 p-2">
                <input type="text" name="task_detail" placeholder="Task Detail" value={taskData['task_detail']} onChange={handleTaskChange} className={'form-control input-field m-0 ' + (errors.task_detail ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.task_detail}
                </div>
              </div>


              <div className="w-100 p-2">
                <label htmlFor="" className='font-2 macan-semibold mb-2'>Task Detail Video</label>
                <input type="file" name="task_detail_video" onChange={handleTaskChange} className={'form-control input-field m-0 ' + (errors.task_detail_video ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.task_detail_video}
                </div>
              </div>

              <div className="w-100 p-2">
                <label htmlFor="" className='font-2 macan-semibold mb-2'>Requirement Document</label>
                <input type="file" name="requirement_document" placeholder="Requirement Document" onChange={handleTaskChange} className={'form-control input-field m-0 ' + (errors.requirement_document ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.requirement_document}
                </div>
              </div>

              <div className="w-100 p-2">
                <input type="text" name="task_timeline" placeholder="Task Timeline" value={taskData['task_timeline']} onChange={handleTaskChange} className={'form-control input-field m-0 ' + (errors.task_timeline ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.task_timeline}
                </div>
              </div>

              <div className="w-100 p-2">
                <input type="number" name="task_cost" placeholder="Task Cost" value={taskData['task_cost']} onChange={handleTaskChange} className={'form-control input-field m-0 ' + (errors.task_cost ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.task_cost}
                </div>
              </div>





              <div className="w-100 p-2">
                <input type="text" name="remarks" placeholder="Remarks" value={taskData['remarks']} onChange={handleTaskChange} className={'form-control input-field m-0 ' + (errors.remarks ? 'is-invalid' : '')} />
                <div class="invalid-feedback">
                  {errors.remarks}
                </div>
              </div>

              <div className="w-100 p-2">
                <select
                  name="project"
                  value={taskData['project']}
                  onChange={handleTaskChange}
                  className={'form-control input-field m-0 ' + (errors.project ? 'is-invalid' : '')}
                >
                  <option value="">Select project</option>
                  {
                    projects && projects.map((data, index) => {
                      return <option value={data.id}>{data.project_name}</option>
                    })
                  }

                </select>
                <div className="invalid-feedback">
                  {errors.project}
                </div>
              </div>

              <div className="w-100 p-2">
                <select
                  name="developer"
                  value={taskData['developer']}
                  onChange={handleTaskChange}
                  className={'form-control input-field m-0 ' + (errors.developer ? 'is-invalid' : '')}
                >
                  <option value="">Select developer</option>
                  {
                    developers && developers.map((data, index) => {
                      return <option value={data.id}>{data.username}</option>
                    })
                  }

                </select>
                <div className="invalid-feedback">
                  {errors.project}
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
