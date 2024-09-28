import React, { useEffect, useState } from 'react'
import BasePage from '../BasePage/BasePage'
import DownloadButton from '../../Components/DownloadButton/DownloadButton'
import CustomDatePicker from '../../Components/CustomDatePicker/CustomDatePicker'
import TableWithPagination from '../../Components/TableWithPagination/TableWithPagination'
import { subDays } from 'date-fns'
import { useParams } from 'react-router-dom'
// import axios from 'axios'
import axios from '../../Api/axios'
import Loader from '../../Components/Loader/Loader'

import { useAuth } from '../../Provider/AuthProvider'

export default function Earning() {
  const { user_id } = useParams(); // Get the route parameter
  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])
  const [earningType,setEarningType] = useState("subscription")
  const [loader,setLoader] = useState(false)
  const {userDetail} = useAuth()
  const [subscriptionData, setSubscriptionData] = useState({
    
    columns: [
      {
        label: 'Plan Name',
        field: 'plan',

      },
      {
        label: 'Price',
        field: 'price',

      },
      {
        label: 'User ID',
        field: 'user_id'
      },
      {
        label: 'Name',
        field: 'name',

      },
      {
        label: 'Username',
        field: 'username',

      },
      {
        label: 'Status',
        field: 'status_str',

      },
      {
        label: 'Payment Type',
        field: 'payment',

      },
      {
        label: 'Start Date',
        field: 'start_date',

      },
      {
        label: 'End Date',
        field: 'end_date',

      },
      {
        label: 'Cancelled',
        field: 'cancelled_str',

      },
      {
        label: 'Subscription ID',
        field: 'subscription_id',

      }
    ]
  })
  const [productData,setProductData] = useState({
    
    columns: [
      {
        label: 'Order Date',
        field: 'order_date',

      },
      {
        label: 'Order Number',
        field: 'order_number',

      },
      {
        label: 'Status',
        field: 'status'
      },
      {
        label: 'Username',
        field: 'username',

      },
      {
        label: 'Full Name',
        field: 'full_name',

      },
      {
        label: 'Mobile Number',
        field: 'mobile_number',

      },
      {
        label: 'Email Address',
        field: 'email_address',

      },
      {
        label: 'Address',
        field: 'Address',

      },
      {
        label: 'Pyament',
        field: 'payment',

      },
      {
        label: 'Item Name',
        field: 'order_items',

      },
      {
        label: 'Item Quantity',
        field: 'item_quantity',

      },
      {
        label: 'Order Total',
        field: 'order_total',

      },
      {
        label: 'Mail Service',
        field: 'mail_service',

      },
      {
        label: 'Discount',
        field: 'discount',

      },
    ]
  })
  const [tableData,setTableData] = useState({})

  useEffect(()=>{
    if(userDetail['role'] === 'admin'){
      if(earningType === 'subscription'){
        setTableData(subscriptionData)
      }
      else if(earningType === 'product'){
        setTableData(productData)
      }
    }
    else if(userDetail['role'] === 'subscription'){
      setTableData(subscriptionData)
    }
    else if(userDetail['role'] === 'product'){
      setTableData(productData)
    }
  },[earningType,subscriptionData,productData])


  useEffect(()=>{
    if(user_id){
      axios.get('user/role',{
        params: {
          user_id:user_id
        }
      }).then(response=>{
        setEarningType(response.data.role)
      }).catch(error=>{
        console.log(error)
      })
    }
  },[])
 
 

  useEffect(()=>{
    if(userDetail['role']==="admin"){
      if(earningType === 'subscription'){
        subcriptionEarningApi()
      }
      else if(earningType === 'product'){
        productEarningApi()
      }
      else{

      }
    }
    else if(userDetail['role']==='subscription'){
      subcriptionEarningApi()
    }
    else if(userDetail['role']==='product'){

      productEarningApi()
    }
    else{

    }
    
  },[dates,earningType])

  const setEarning= (e) =>{
    const {name,value} = e.target
    setEarningType(value)
  }

  const subcriptionEarningApi =() =>{
    setLoader(true)
    axios.get('/subscriptions/',{
      params: {
        dates: dates,
        user_id:user_id
      }
    })
    .then(response =>{
      
      setSubscriptionData(prevState=>({
        ...prevState,
        rows : response.data
      }))
      setLoader(false)
    }).catch(error=>{
      setLoader(false)
      console.log(error)
    })
  }
  const productEarningApi =() =>{
    setLoader(true)
    axios.get('/orders/',{
      params: {
        dates: dates,
        user_id:user_id
      }
    })
    .then(response =>{
      
      setProductData(prevState=>({
        ...prevState,
        rows : response.data
      }))
      setLoader(false)
    }).catch(error=>{
      setLoader(false)
      console.log(error)
    })
  }

  return (
    <BasePage title="Earnings">
      {loader && <Loader/>}
      <div className="row">
        <div className="col-sm-2">
              <CustomDatePicker dates={dates} setDates={setDates} />
        </div>
        <div className="col-sm-2">
        {
              userDetail['role'] === 'admin' && !user_id && <select name="earning_type" className='h-100 w-100' style={{backgroundColor:'white',border:'1px solid #e4e5e7',borderRadius:'2px'}} onChange={setEarning}>
                
                <option value="subscription" >Subscription Earning</option>
                <option value="product">Product Earning</option>
                
              </select>
            

            }
        </div>
        <div className="col-sm-8 text-end">
          

          <DownloadButton data={tableData} filename="EarningReport.csv" />

        </div>

        <div className='desktop' style={{ height: '95%' }}>
          <TableWithPagination data={tableData} />
        </div>
      </div>
    </BasePage>
  )
}
