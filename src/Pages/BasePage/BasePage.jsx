import React, { useState } from 'react'
import Topbar from './../../Components/Topbar/Topbar'
import Sidebar from './../../Components/Sidebar/Sidebar'
export default function BasePage({ title,children }) {
    const [sidebarWidth, setSidebarWidth] = useState(false)

    const changeSidebarWidth = () => {
        setSidebarWidth(!sidebarWidth)
        if (window.innerWidth < 576) {
          var styles = document.documentElement.style;
          // styles.getItem
          // console.log(styles.getPropertyValue('--sub-sidebar-left'),'----------------------1111111')
          // if(styles.getPropertyValue('--sub-sidebar-left')==="65px"){
          styles.setProperty('--sub-sidebar-left', '-235px');
          // }
          // else{
    
          //   styles.setProperty('--sub-sidebar-left', '65px');
          // }
        }
    
    
    
      }
  return (
    <div>
                      <Topbar title={title}/>
                      <div id='main' className=''>
                        <Sidebar changeSidebarWidth={changeSidebarWidth} />
                        <div  className="content-div p-5">

                        {children}

                        </div>

                      </div>
                    </div>
  )
}
