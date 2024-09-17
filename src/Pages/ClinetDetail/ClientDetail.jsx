import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import DownloadButton from '../../Components/DownloadButton/DownloadButton'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import Loader from '../../Components/Loader/Loader'

export default function ClientDetail() {
  const { user_id } = useParams()
  const [isEdit, setIsEdit] = useState(false)
  const [userProfile,setUserProfile] = useState()
  const [errors,setErrors] = useState({})
  const [loader,setLoader] = useState(false)

  const [clientData, setClientData] = useState({
    columns: [
      {

        label: 'Bot ID',
        field: 'bot_id',

      },
      {
        label: 'Telegram Username',
        field: 'telegram_username',

      },
      {
        label: 'Bot Father Token',
        field: 'bot_father_token',

      },
      {
        label: 'Bot URL',
        field: 'bot_url'
      },
      {
        label: 'Server Username',
        field: 'server_username',

      },
      {
        label: 'Server Password',
        field: 'server_password',

      },
      {
        label: 'Instance DNS',
        field: 'instance_dns',

      },
      {
        label: 'Instance Username',
        field: 'instance_username',

      },
      {
        label: 'Instance password',
        field: 'instance_password',

      },
      {
        label: 'Edit',
        field: 'action',

      },

    ]
  })

 

  useEffect(() => {
    clientApi()
  }, [])

  useEffect(()=>{
    if(isEdit){
      setUserProfile(clientData.rows[0])
      
    }
  },[isEdit])





  const handleChange = (e) =>{
    const {name,value} = e.target
    console.log(value,userProfile)
    
    setUserProfile(prevState=>({
      ...prevState,
      [name]:value
    }))
  }

  const clientApi = async () => {
    setLoader(true)
    await axios.get("/client-detail/",{
      params: {
     
        user_id:user_id
      }
    })
      .then(response => {
        const data = response.data

        for (var i = 0; i < data.length; i++) {
          data[i]['action'] = <button onClick={() => { setIsEdit(true) }} style={{backgroundColor:'transparent',border:'none'}}>Edit</button>

        }

        setClientData(prevState => ({
          ...prevState,
          rows: data
        }))
        setLoader(false)
      }).catch(error => {
        console.log(error)
        setLoader(false)
        
      })

      
  }

  const updateApi = async (e) =>{
    e.preventDefault()
    setLoader(true)
    const data = {...userProfile}
    delete data['action']
    
    await axios.put('/client-detail/'+userProfile.id+'/',data)
    .then(response=>{
      console.log(response)
      setIsEdit(false)
      setLoader(false)
    }).catch(error=>{
      console.log(error)
      if (error.response.status === 400) {
        setErrors(error.response.data)
    }
    else{
        setErrors({})
    }
    setLoader(false)
    })
    await clientApi()
  }
  return (
    <BasePage title="Users">
      {loader && <Loader/>}
      
      <div className="row">
        <div className="col-sm-3 my-2">
          <div className="row  h-100 justify-content-end">
            <div className='col-10 h-100 '>


            </div>
            <div className="col-2 h-100" style={{ textAlign: 'end' }}>

            </div>

          </div>
        </div>
        <div className="col-sm-9 text-end">

          <DownloadButton data={clientData} filename="SubscriptionReport.csv" />

        </div>

        <div className='desktop' style={{ height: '95%' }}>
          <TableWithPagination data={clientData} />
        </div>
      </div>
      <Modal
        show={isEdit}
        onHide={() => { setIsEdit(false) }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >

        <Modal.Body style={{ maxHeight: "80vh", overflow: 'auto' }}>

          <div className='p-3 h-100' >
            <p className='text-center font-2 macan-semibo;d'>Update Client Detail</p>
            
               {
                userProfile && <form onSubmit={updateApi} className='p-2'>
                <div className="w-100 p-2">
                  <input type="text" name="telegram_username" placeholder="Telegram Username" value={userProfile['telegram_username']}  onChange={handleChange} className={'form-control input-field m-0 ' + (errors.telegram_username ? 'is-invalid' : '')} />
                  <div class="invalid-feedback">
                    {errors.telegram_username}
                  </div>
                </div>
  
                <div className="w-100 p-2">
                  <input type="text" name="bot_father_token" placeholder="Bot Father Token" value={userProfile['bot_father_token']}  onChange={handleChange} className={'form-control input-field m-0 ' + (errors.bot_father_token ? 'is-invalid' : '')} />
                  <div class="invalid-feedback">
                    {errors.bot_father_token}
                  </div>
                </div>
                <div className="w-100 p-2">
                  <input type="text" name="bot_url" placeholder="Bot URL" value={userProfile['bot_url']}  onChange={handleChange} className={'form-control input-field m-0 ' + (errors.bot_url ? 'is-invalid' : '')} />
                  <div class="invalid-feedback">
                    {errors.bot_url}
                  </div>
                </div>
                <div className="w-100 p-2">
                  <input type="text" name="server_username" placeholder="Server Username" value={userProfile['server_username']}  onChange={handleChange} className={'form-control input-field m-0 ' + (errors.server_username ? 'is-invalid' : '')} />
                  <div class="invalid-feedback">
                    {errors.server_username}
                  </div>
                </div>
                <div className="w-100 p-2">
                  <input type="text" name="server_password" placeholder="Server Password" value={userProfile['server_password']}  onChange={handleChange} className={'form-control input-field m-0 ' + (errors.server_password ? 'is-invalid' : '')} />
                  <div class="invalid-feedback">
                    {errors.server_password}
                  </div>
                </div>
                <div className="w-100 p-2">
                  <input type="text" name="instance_dns" placeholder="Instance DNs" value={userProfile['instance_dns']}  onChange={handleChange} className={'form-control input-field m-0 ' + (errors.instance_dns ? 'is-invalid' : '')} />
                  <div class="invalid-feedback">
                    {errors.instance_dns}
                  </div>
                </div>
                <div className="w-100 p-2">
                  <input type="text" name="instance_username" placeholder="Instance Username" value={userProfile['instance_username']}  onChange={handleChange} className={'form-control input-field m-0 ' + (errors.instance_username ? 'is-invalid' : '')} />
                  <div class="invalid-feedback">
                    {errors.instance_username}
                  </div>
                </div>
                <div className="w-100 p-2">
                  <input type="text" name="instance_password" placeholder="Instance Passowrd" value={userProfile['instance_password']}  onChange={handleChange} className={'form-control input-field m-0 ' + (errors.instance_password ? 'is-invalid' : '')} />
                  <div class="invalid-feedback">
                    {errors.instance_password}
                  </div>
                </div>
                <div className="w-100 text-center mt-2">
                  <button type='submit' className='btn btn-dark pt-2 pb-2 m-0 ms-3 font-1 macan-bold'>Update</button>
                </div>
              </form>
               }
            



          </div>







        </Modal.Body>

      </Modal>
    </BasePage>
  )
}
