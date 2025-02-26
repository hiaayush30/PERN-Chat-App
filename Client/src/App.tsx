import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/protected/Home';
import Layout from './Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import Logo from './assets/Logo';
import Loader from './components/Loader';
import ProfileOptions from './components/ProfileOptions';

const App = () => {
  const authContext = useAuthContext();
  if (authContext.isLoading) return <div className='min-h-screen flex flex-col justify-center items-center'>
    <Logo bgColor='black' color='white' />
    <Loader />
  </div>
  else return (
    <>
    {authContext.authUser && <ProfileOptions/>}
      <BrowserRouter>
        {!authContext.authUser &&
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to={'/login'} replace />} />
          </Routes>}

        {authContext.authUser &&
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Navigate to={'home'} replace={true} />} />
              <Route path='home' element={<Home />} />
            </Route>
            <Route path='*' element={<Navigate to={'/home'} replace />} />
          </Routes>}
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
