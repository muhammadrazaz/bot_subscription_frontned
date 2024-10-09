import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import DownloadButton from '../../Components/DownloadButton/DownloadButton'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import { subDays } from 'date-fns'
// import axios from 'axios'
import axios from '../../Api/axios'
import { Link } from "react-router-dom";
import Loader from '../../Components/Loader/Loader'
import { useAuth } from '../../Provider/AuthProvider'
export default function Users() {
  const [errors, setErrors] = useState({})
  const [file, setFile] = useState(null);
  const [laoder,setLoader] = useState(false)
  const [type,setType] = useState("subscription")
  const {userDetail} = useAuth()

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const [userData, setUserData] = useState({
    columns: [
      {
        label: 'Web Username',
        field: 'web_username',
      },
      {
        label: 'Web Password',
        field: 'web_password',
      },
      {
        label: 'Total Users',
        field: 'total_users',
      },
      {
        label: 'Details',
        field: 'action',
      },
      {
        label: 'Earnings',
        field: 'view_earnings',
      },
    ],
  });

  useEffect(() => {
    // Conditionally add 'Total Earnings' column based on the type
    setUserData(prevState => ({
      ...prevState,
      columns: [
        {
          label: 'First Name',
          field: 'first_name',
        },
        {
          label: 'Last Name',
          field: 'last_name',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Web Username',
          field: 'web_username',
        },
        {
          label: 'Web Password',
          field: 'web_password',
        },
        ...((type === 'subscription' || type === 'product') && userDetail['role'] !== "VA" ? [{
          label: 'Total Earnings',
          field: 'total_earnings',
        },
       ] : []),

        ...(type === 'subscription' || type === 'product' ? [
        {
          label: 'Total Users',
          field: 'total_users',
        },] : []),

        ...(type === 'pdf' ? [{
          label: 'Total PDF',
          field: 'total_pdf',
        },

        ] : []),

        ...(type === 'instagram' ? [{
          label: 'Total Post',
          field: 'total_post',
        },

        ] : []),
       
        {
          label: 'Details',
          field: 'action',
        },

        
        ...(type === 'subscription' || type === 'product' ? [{
          label: 'Earnings',
          field: 'view_earnings',
        },] : []),
        
      ],
    }));
  }, [type]);

  useEffect(() => {
    clientApi()
  }, [type])


  const handleChangeType = (e) =>{
    const {name,value} = e.target
    setType(value)
  } 

  const clientApi = () => {
    setLoader(true)
    var url = ''
    if(type==="subscription"){
      url ="clients/"
    }
    else if(type === 'product'){
      url = 'product-clients/'
    }
    else if(type === 'pdf'){
      url = 'pdf/users'
    }
    else if(type === 'instagram'){
      url = 'instagram/users/'
    }
    axios.get(url)
      .then(response => {
        console.log(response)
        const data = response.data

        for (var i = 0; i < data.length; i++) {
          
          if(type === 'pdf'){
            data[i]['action'] = <Link to={"/pdf/history/" + data[i].id}>Details</Link>
          }
          else if(type === 'instagram'){
            data[i]['action'] = <Link to={"/instagram/history/" + data[i].id}>Details</Link>
          }
          else{
            data[i]['action'] = <Link to={"/users/" + data[i].id}>Details</Link>
          }
          data[i]['view_earnings'] = <Link to={"/earnings/" + data[i].id}>View Earnings</Link>
        }

        setUserData(prevState => ({
          ...prevState,
          rows: data
        }))
        setLoader(false)
      })
      .catch(error => {
        setLoader(false)
        console.log(error)
      })
  }

  const uplaodFile = async (e) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData();
    formData.append('file', file);

    await axios.post("upload-csv/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      // console.log(response)
      alert(response.data.message)
      setFile()
      setLoader(false)
    }).catch(error => {
      console.log(error)
      if(error.response.status === 400){
        setErrors(error.response.data)
      }
      setLoader(false)
    })

   


  }
  return (
    <BasePage title="Users">
      {laoder && <Loader/>}
      <div className="row">
        <div className="col-sm-3 my-2">
          <div className="row  h-100 justify-content-end">
            <div className='col-12 h-100 '>

              <form onSubmit={uplaodFile} className='p-0' >
                <div style={{display:'flex',justifyContent:"space-between"}}>
                  <div class="">

                    <input type="file" name="file" placeholder="Upload csv" accept='.csv' onChange={handleFileChange} className={'file' in errors ? 'form-control is-invalid' : 'form-control'} />
                    {/* <div></div> */}
                    <div class="invalid-feedback">
                      {errors.file}
                    </div>
                  </div>
                  <button type='submit' className='btn btn-dark pt-2 pb-2 m-0 ms-3'>upload</button>
                </div>

              </form>
            </div>
            

          </div>
        </div>
        <div className="col-md-4 my-2" style={{ textAlign: 'end' }}>
          
            {
              (userDetail['role'] === 'admin' || userDetail['role'] === 'VA') && <select name="type" className='h-100 w-100 py-2' style={{backgroundColor:'white',border:'1px solid #e4e5e7',borderRadius:'2px'}} onChange={handleChangeType}>
                
                <option value="subscription" >Subscription Users</option>
                <option value="product">Product Users</option>
                <option value="pdf">PDF Users</option>
                <option value="instagram">Instgram Users</option>
                
              </select>
            

            }
            </div>
        <div className="col-sm-5 text-end">

          <DownloadButton data={userData} filename="SubscriptionReport.csv" />

        </div>

        <div  style={{ height: '95%' }}>
          <TableWithPagination data={userData} />
        </div>
      </div>
    </BasePage>
  )
}
