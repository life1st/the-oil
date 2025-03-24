import { Outlet, useSearchParams } from 'react-router-dom'
import TabBar from '../tab-bar'
import './style.scss'

const Layout = () => {
  const [params] = useSearchParams()
  
  const hideTab = params.get('notab') === '1'
  return (
    <>
      <Outlet />
      {hideTab ? null : <TabBar />}
    </>
  )
}

export default Layout 