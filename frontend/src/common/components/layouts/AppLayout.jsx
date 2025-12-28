import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'; 
import Header from '../header/Header';
import { useDispatch } from 'react-redux';
import { setInitialAuth } from '../../../features/auth/authSlice';



const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialAuth());
  }, [dispatch]);

  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default AppLayout;
