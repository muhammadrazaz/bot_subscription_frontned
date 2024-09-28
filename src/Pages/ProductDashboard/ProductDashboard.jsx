import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import CustomBarChart from '../../Components/CustomBarChart/CustomBarChart'
import CustomLineChart from '../../Components/CustomLineChart/CustomLineChart'
import CustomPieChart from '../../Components/CustomPieChart/CustomPieChart'
// import axios from 'axios'
import axios from '../../Api/axios'

// Asset
import bestPerformer from '../../Assets/best-performer-icon.svg'
import pieIcon from '../../Assets/pie-icon.svg'
import saleChannelPieIcon from '../../Assets/sale-channel-pie-icon.svg'
import saleStatIcon from '../../Assets/sale-stat-icon.svg'
import increaseIcon from '../../Assets/Increase-icon.svg'
import decreaseIcon from '../../Assets/decrease-icon.svg'
import activeKioskIcon from '../../Assets/active-kiosk-icon.svg'
import productCardIcon from '../../Assets/product-card-icon.svg'
import employeeCardIcon from '../../Assets/employee-card-icon.svg'
import statsCardIcon from '../../Assets/stats-card-icon.svg'





export default function ProductDashboard(props) {
    

    const [dashboardData, setDashboardData] = useState({
        earnings: 0,
        new_orders: 0,
        total_products :0,
        overall_earnings: 0,
        status_summary: [],
        category_counts: [],
        monthly_earnings: [],
        payment_earnings: []
      })
    
     
    
      useEffect(() => {
        dashboardApi()
      }, [props.dates])
    
    
      const dashboardApi = () => {
        props.setLoader(true)
        axios.get("product-dashboard/", {
          params: {
            dates: props.dates
          }
        })
          .then(response => {
            console.log(response)
            setDashboardData(response.data)
    
            props.setLoader(false)
          }).catch(error => {
            props.setLoader(false)
            console.log(error)
          })
      }
    
    
      const status_colors = ['#F98925', '#232529'];
    
    
      const category_colors = ['#F98925', '#232529', '#A51854'];


  return (
    <div>
            <div className="row mt-5">
              <div className="col-sm-6 col-md-3 pb-3">

                <div className="p-3 top-card">
                  <p className='mb-1 font-1 macan-bold'><Link to="/earnings" style={{ color: 'black' }}>{dashboardData['earnings']}</Link></p>
                  <p className='mb-1 font-2 macan-semibold'>Earnings</p>
                  <div className='d-flex justify-content-end'>
                    <img src={activeKioskIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3 pb-3">

                <div className="p-3  top-card">
                  <p className='mb-1 font-1 macan-bold'>{dashboardData['total_products']}</p>
                  <p className='mb-1 font-2 macan-semibold'>Total Products</p>
                  <div className='d-flex justify-content-end'>
                    <img src={productCardIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3 pb-3">

                <div className=" p-3 top-card">
                  <div>
                    {dashboardData.total_users && <span>
                      <p className='mb-1 font-1 macan-bold'><Link to="/users/" style={{ color: 'black' }}>{dashboardData['total_users']}</Link></p>
                      <p className='mb-1 font-2 macan-semibold'>Total Users</p>
                    </span>}
                    {
                      dashboardData.total_users === '' && <span>
                        <p className='mb-1 font-1 macan-bold'>{dashboardData['new_order']}</p>
                        <p className='mb-1 font-2 macan-semibold'>New Orders</p>
                      </span>
                    }


                  </div>
                  <div className='d-flex justify-content-end '>
                    <img src={employeeCardIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3 pb-3">

                <div className="p-3 top-card">
                  {/* <p className='mb-1 font-1 semi-bold'>{parseInt(saleStats.total_price).toLocaleString()}</p> */}
                  <div></div>
                  <p className='mb-1 font-1 macan-bold'>{dashboardData['overall_earnings']}</p>
                  <p className='mb-1 font-2 macan-semibold'>Overall Earnings <span className='macan-regular text-gray' style={{ fontWeight: "normal !important", fontSize: '10px' }}> (not effected by date)</span></p>
                  <div className='d-flex justify-content-end '>
                    <img src={statsCardIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4 dash-cards ">
              <div className="col-sm-4 dash  pb-3">
                <div className="dash-card h-100 p-3">
                  <div className="chart-title">
                    {/* <img src={bestPerformer} alt="" style={{ verticalAlign: 'middle' }} /> */}
                    <span className='px-1 font-2 macan-bold'>Orders Status</span>
                  </div>
                  <div style={{ height: "90%" }}>
                    <CustomPieChart icon={pieIcon} data={dashboardData['status_summary']} colors={status_colors} />

                  </div>

                </div>
              </div>
              <div className="col-sm-8 dash pb-3">
                <div className='dash-card h-100 p-3 perfomance-chart-div'>
                  <div className="h-100 perfomance-chart">

                    <div className="chart-title">
                      {/* <img src={bestPerformer} alt="" style={{ verticalAlign: 'middle' }} /> */}
                      <span className='px-1 font-2 macan-bold'>Payments Method Earning</span>
                    </div>
                    <div style={{ height: "90%" }}>

                      <CustomBarChart data={dashboardData['payment_earnings']} />
                    </div>
                  </div>
                </div>
              </div>


            </div>

            <div className="row mt-4 dash-cards ">
              <div className="col-sm-8 dash pb-3 ">
                <div className='dash-card h-100 p-3 perfomance-chart-div '>
                  <div className='perfomance-chart h-100'>
                    <div className="chart-title">

                      {/* <img src={bestPerformer} alt="" style={{ verticalAlign: 'middle' }} /> */}
                      <span className='px-1 font-2 macan-bold'>Monthly Performance</span>
                    </div>
                    <div style={{ height: "90%" }}>
                      <CustomLineChart data={dashboardData['monthly_earnings']} />
                    </div>
                  </div>

                </div>

              </div>
              <div className="col-sm-4 dash pb-3">
                <div className="dash-card h-100 p-3 ">
                  <div className="chart-title">


                    <span className='px-1 font-2 macan-bold'>Category Products</span>
                  </div>
                  <div style={{ height: "90%" }}>
                    <CustomPieChart icon={saleChannelPieIcon} data={dashboardData['category_counts']} colors={category_colors} />

                  </div>

                </div>
              </div>
            </div>
          </div>
  )
}
