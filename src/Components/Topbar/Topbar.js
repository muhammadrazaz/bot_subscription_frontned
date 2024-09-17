import React, { useContext, useEffect, useState } from 'react'
import './Topbar.css'
import logoPng from '../../Assets/LogoPng.png'
import verticalLine from '../../Assets/verti-line.png'
import profileImg from '../../Assets/profile.jpg'


import { useAuth } from '../../Provider/AuthProvider'




export default function Topbar(props) {
    const [unreadNotification,setUnreadNotification] = useState(0)
    const {token,userDetail} = useAuth()
    
  


    


    

    
    const hideAndShowSubSidebar = () =>{
        if(window.location !=='/'){

        
        if(window.innerWidth<576){
            var styles = document.documentElement.style;
            
            if(styles.getPropertyValue('--sub-sidebar-left')==="65px"){
              styles.setProperty('--sub-sidebar-left', '-235px');
            }
            else{
      
              styles.setProperty('--sub-sidebar-left', '65px');
            }
          }
        }
    }
    return (
        <div className='top-bar d-flex p-2 justify-content-between'>
            <div className='d-flex'>
                <span className='align-items-center topbar-logo'>

                <img src={logoPng} className='h-75 ' alt="" />
                <p className='font-2 macan-bold m-0 ' style={{paddingLeft:'10px'}}>Bot Subscription</p>
                <img src={verticalLine} alt="" className='h-100 ps-4 pe-4' />
                </span>
                <div className='d-flex align-items-center'>
                
                <p className='font-2 macan-semibold m-0'>{props.title}</p>
                </div>
            </div>
            <div className='position-reletive mr-3'>
                <span className='pe-3 font-2 macan-regular'>{userDetail && userDetail['name']}</span>
                <img className='h-100 profile-img' src={profileImg}/>
            </div>
        </div>
    )
}
