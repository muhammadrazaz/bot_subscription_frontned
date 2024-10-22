import React, { useContext, useEffect } from 'react'
import './Sidebar.css'





import dashboardIcon from '../../Assets/dashboard.svg'
import saleStatsIcon from '../../Assets/sale-stats-icon.svg'
import userManagementIcon from '../../Assets/user-management-icon.svg'
import productIcon from '../../Assets/products.svg'
import logoutIcon from '../../Assets/logout-icon.svg'
import historyIcon from '../../Assets/production-history-icon.svg'
import paymentIcon from '../../Assets/sale-stats-icon.svg'
import logoPng from '../../Assets/logowhitepng.png'
import developerIcon from '../../Assets/inventory-icon.svg'


import { MDBTooltip } from 'mdb-react-ui-kit';

import { NavLink, Navigate, redirect } from 'react-router-dom'
import { useAuth } from '../../Provider/AuthProvider'


export default function Sidebar(props) {
    const { userDetail, setToken, setUserDetail } = useAuth()




    const logout = () => {

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserDetail()
        setToken('')
        window.location.href = '/'
    }






    return (
        <div className='h-100' style={{ position: 'relative' }}>
            <div id='sidebar' >

                <div className="icon-bar ">
                    <div className='text-center sidebar-logo'><img src={logoPng} className='w-50' alt="" />

                    </div>

                    {
                        userDetail && userDetail.role === "admin" && <><MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Dashboard" placement='right'>
                            <NavLink to='/' className={window.location.pathname === '/' ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={dashboardIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Earnings" placement='right'>
                                <NavLink to='/earnings' className={window.location.href.includes('earnings') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={saleStatsIcon} alt="" />
                                </NavLink>

                            </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Users" placement='right'>
                                <NavLink to='/users' className={window.location.href.includes('users') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={userManagementIcon} alt="" style={{ height: '20px' }} />
                                </NavLink>

                            </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Products" placement='right'>
                                <NavLink to='/products' className={window.location.href.includes('products') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={productIcon} alt="" style={{ height: '20px' }} />
                                </NavLink>

                            </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Projects" placement='right'>
                                <NavLink to='/project' className={window.location.href.includes('project') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={productIcon} alt="" style={{ height: '20px' }} />
                                </NavLink>

                            </MDBTooltip>
                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Open Task" placement='right'>
                                <NavLink to='/open-tasks' className={window.location.href.includes('/open-tasks') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={historyIcon} alt="" />
                                </NavLink>

                            </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Developers" placement='right'>
                                <NavLink to='/developers' className={window.location.href.includes('/developers') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={developerIcon} alt="" />
                                </NavLink>

                            </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Payments" placement='right'>
                                <NavLink to='/payment' className={window.location.href.includes('payment') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={paymentIcon} alt="" style={{ height: '20px' }} />
                                </NavLink>

                            </MDBTooltip>
                        </>


                    }

                    {
                        userDetail && userDetail.role === "VA" && <><MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Dashboard" placement='right'>
                            <NavLink to='/' className={window.location.pathname === '/' ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={dashboardIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Earnings" placement='right'>
                                <NavLink to='/earnings' className={window.location.href.includes('earnings') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={saleStatsIcon} alt="" />
                                </NavLink>

                            </MDBTooltip>

                            {/* <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Users" placement='right'>
                                <NavLink to='/users' className={window.location.href.includes('users') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={userManagementIcon} alt="" style={{ height: '20px' }} />
                                </NavLink>

                            </MDBTooltip> */}

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Projects" placement='right'>
                                <NavLink to='/project' className={window.location.href.includes('project') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={productIcon} alt="" style={{ height: '20px' }} />
                                </NavLink>

                            </MDBTooltip>
                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Open Task" placement='right'>
                                <NavLink to='/open-tasks' className={window.location.href.includes('/open-tasks') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={historyIcon} alt="" />
                                </NavLink>

                            </MDBTooltip>
                        </>


                    }

                    {
                        userDetail && userDetail.role === "subscription" && <><MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Dashboard" placement='right'>
                            <NavLink to='/' className={window.location.pathname === '/' ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={dashboardIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Earnings" placement='right'>
                                <NavLink to='/earnings' className={window.location.href.includes('earnings') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={saleStatsIcon} alt="" />
                                </NavLink>

                            </MDBTooltip>

                        </>


                    }

                    {
                        userDetail && userDetail.role === "product" && <><MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Dashboard" placement='right'>
                            <NavLink to='/' className={window.location.pathname === '/' ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={dashboardIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Earnings" placement='right'>
                                <NavLink to='/earnings' className={window.location.href.includes('earnings') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={saleStatsIcon} alt="" />
                                </NavLink>

                            </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Products" placement='right'>
                                <NavLink to='/products' className={window.location.href.includes('products') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={productIcon} alt="" style={{ height: '20px' }} />
                                </NavLink>

                            </MDBTooltip>

                        </>


                    }

                    {
                        userDetail && userDetail.role === "pdf" && <><MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Dashboard" placement='right'>
                            <NavLink to='/' className={window.location.pathname === '/' ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={dashboardIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>

                            <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="PDF History" placement='right'>
                                <NavLink to='/pdf/history' className={window.location.href.includes('pdf/history') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                    <img src={historyIcon} alt="" />
                                </NavLink>

                            </MDBTooltip>

                        </>


                    }

                {
                        userDetail && userDetail.role === "instagram" && <><MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Dashboard" placement='right'>
                            <NavLink to='/' className={window.location.pathname === '/' ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={dashboardIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>

                           

                        </>


                    }

{
                        userDetail && userDetail.role === "developer" && <><MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Dashboard" placement='right'>
                            <NavLink to='/' className={window.location.pathname === '/' ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={dashboardIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>

                        {/* <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Projects" placement='right'>
                            <NavLink to='/project' className={window.location.href.includes('project') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={productIcon} alt="" style={{ height: '20px' }} />
                            </NavLink>

                        </MDBTooltip> */}

                        <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Open Task" placement='right'>
                            <NavLink to='/open-tasks' className={window.location.href.includes('/open-tasks') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={historyIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>

                           

                        </>


                    }


                    {/* <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Dashboard" placement='right'>
                        <NavLink to='/' className={window.location.pathname === '/' ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                            <img src={dashboardIcon} alt="" />
                        </NavLink>

                    </MDBTooltip>
                    {
                        userDetail && (userDetail['role'] === 'admin' || userDetail['role'] === 'subscription' || userDetail['role'] === 'product') && <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Earnings" placement='right'>
                            <NavLink to='/earnings' className={window.location.href.includes('earnings') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={saleStatsIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>
                    }

                    {
                        userDetail && (userDetail['role'] === 'admin' || userDetail['role'] === 'pdf') && <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="PDF History" placement='right'>
                            <NavLink to='/pdf/history' className={window.location.href.includes('pdf/history') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={historyIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>
                    }

                    {
                        userDetail && (userDetail['role'] === 'admin' || userDetail['role'] === 'instagram') && <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Post History" placement='right'>
                            <NavLink to='/instagram/history' className={window.location.href.includes('instagram/history') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={historyIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>
                    }





                    {
                        userDetail && userDetail['role'] == "admin" && <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Users" placement='right'>
                            <NavLink to='/users' className={window.location.href.includes('users') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={userManagementIcon} alt="" style={{ height: '20px' }} />
                            </NavLink>

                        </MDBTooltip>
                    }

                    {
                        userDetail && userDetail['role'] == "admin" && <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Payments" placement='right'>
                            <NavLink to='/payment' className={window.location.href.includes('payment') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={paymentIcon} alt="" style={{ height: '20px' }} />
                            </NavLink>

                        </MDBTooltip>
                    }

                    {
                        userDetail && userDetail['role'] == "admin" && <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Projects" placement='right'>
                            <NavLink to='/project' className={window.location.href.includes('project') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={productIcon} alt="" style={{ height: '20px' }} />
                            </NavLink>

                        </MDBTooltip>
                    }

                    {
                        userDetail && (userDetail['role'] === 'admin' || userDetail['role'] === 'developer' || userDetail['role'] === 'VA') && <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Open Task" placement='right'>
                            <NavLink to='/open-tasks' className={window.location.href.includes('/open-tasks') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={historyIcon} alt="" />
                            </NavLink>

                        </MDBTooltip>
                    }

                    {
                        userDetail && userDetail['role'] === 'product' && <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Products" placement='right'>
                            <NavLink to='/products' className={window.location.href.includes('products') ? 'nav-link active-1' : 'nav-link'} onClick={props.changeSidebarWidth}>
                                <img src={productIcon} alt="" style={{ height: '20px' }} />
                            </NavLink>

                        </MDBTooltip>
                    }
 */}








                    <MDBTooltip tag='span' wrapperClass="d-flex align-items-center justify-content-center" title="Logout" placement='right'>

                        <NavLink to="" className={'nav-link mt-5'} onClick={logout}>
                            <img src={logoutIcon} alt="" />
                        </NavLink>

                    </MDBTooltip>






                </div>



            </div>


        </div>
    )
}
