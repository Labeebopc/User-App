import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Dashboard from './components/dashboard/Dashboard';

function App() {

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {

    if (location.pathname === "/") {
      navigate("/login")
    }
  }, [])
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
