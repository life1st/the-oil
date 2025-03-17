import { Outlet } from 'react-router-dom'
import TabBar from '../tab-bar'
import './style.scss'

const Layout = () => {
  return (
    <>
      <Outlet />
      <TabBar />
    </>
  )
}

export default Layout 