import React, { useState } from 'react'
import ToolBar from './ToolBar'
import Sidebar from './Sidebar'
import Backdrop from './Backdrop'

const SideNavbar2 = () => {
  const [sidebar , setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((prevState)=>!prevState)
  }
  return (
    <>
    <ToolBar openSidebar={toggleSidebar}/>
    <Backdrop sidebar={sidebar} closeSidebar={toggleSidebar}/>
    <Sidebar sidebar={sidebar}/>
    </>
  )
}

export default SideNavbar2