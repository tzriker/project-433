import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const MainPage = () => {
  const [isAdding, setIsAdding] = useState(false)
const nav = useNavigate()
  return (
    <>
      <h1 className='text-center mt-5'>Employees mangement system</h1>
      <div className='flex justify-center items-center'>
        <button onClick={() => nav("add")} className='w-14 h-10 bg-gray-800 m-4 text-white'>Add</button>
        <button onClick={()=> nav("display")} className='w-14 h-10 bg-gray-800 m-4 text-white'>Display</button>
      </div>
    </>
  )
}

export default MainPage