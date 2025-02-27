import { Outlet } from 'react-router-dom'

const Layout = () => {
  return ( 
    <div className='min-h-screen flex items-center max-sm:items-end max-sm:py-3 justify-center'>
      <Outlet/>
    </div>
  )
}

export default Layout