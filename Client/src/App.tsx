import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/protected/Home';
import Layout from './Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthContext } from './context/AuthContext';

const App = () => {
  const authContext = useAuthContext();
  if (authContext.isLoading) return <div className='min-h-screen'>Loading...</div>
  else return (
    <BrowserRouter>
      {!authContext.authUser &&
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to={'/signup'} replace/>} />
        </Routes>}

      {authContext.authUser &&
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to={'home'} replace={true} />} />
            <Route path='home' element={<Home />} />
          </Route>
        </Routes>}
    </BrowserRouter>
  )
}

export default App
