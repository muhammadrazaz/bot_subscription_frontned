import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import BasePage from '../BasePage/BasePage'
import CustomDatePicker from '../../Components/CustomDatePicker/CustomDatePicker'
import SubscriptionDashboard from '../SubscriptionDashboard/SubscriptionDashboard'
import ProductDashbaord from '../ProductDashboard/ProductDashboard'
import Loader from '../../Components/Loader/Loader'



import { subDays } from 'date-fns'

import { useAuth } from '../../Provider/AuthProvider'



export default function Dashbaord() {
  const [dates, setDates] = useState([subDays(new Date(), 30), new Date()])

  const [loader, setLoader] = useState(false)
  const [dashboardType, setDashbaordType] = useState("subscription_dashboard")

  const { userDetail } = useAuth()


  const setDashboard = (e) => {
    const { name, value } = e.target
    setDashbaordType(value)
  }

  return (
    <BasePage title="Dashboard">
      {loader && <Loader />}

      <div className="row h-100">
        <div className="col h-100">
          <div className='row'>


            <div className="col-sm-2">

              <CustomDatePicker dates={dates} setDates={setDates} />

            </div>
            {
              userDetail && (userDetail['role'] === "admin" || userDetail['role'] === "VA") && <div className='col-sm-2'>
                <select name="dashboard_type" className='h-100 w-100' style={{ backgroundColor: 'white', border: '1px solid #e4e5e7', borderRadius: '2px' }} onChange={setDashboard}>

                  <option value="subscription_dashboard" >Subscription Dashboard</option>
                  <option value="product_dashboard">Product Dashboard</option>

                </select>
              </div>

            }


          </div>

          {userDetail && (userDetail['role'] === "admin" || userDetail['role'] === "VA") && dashboardType === 'subscription_dashboard' &&
            <SubscriptionDashboard setLoader={setLoader} dates={dates} />
          }

          {userDetail && (userDetail['role'] === "admin" || userDetail['role'] === "VA") && dashboardType === 'product_dashboard' &&
            <ProductDashbaord setLoader={setLoader} dates={dates} />
          }

          {
            userDetail && userDetail['role'] === "subscription" &&
            <SubscriptionDashboard setLoader={setLoader} dates={dates} />
          }

          {
            userDetail && userDetail['role'] == "product" &&
            <ProductDashbaord setLoader={setLoader} dates={dates} />
          }





        </div>
      </div>
    </BasePage>
  )
}
