import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import Input from '../pages/Input'
import Display from '../pages/Display'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='add' element={<Input />} />
      <Route path='display' element={<Display />} />
    </Routes>
  )
}

export default AppRoutes