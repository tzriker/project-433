import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inputValidation } from '../services/InputValidation'
import axios from "axios"
import BASE_URL from '../utils/Urls'
import { useNavigate } from 'react-router-dom'


const Input = () => {
  const nav = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inputValidation),
    mode: 'onSubmit',
  });

  const checkID = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`); // Corrected URL
      if (response.data.length === 0) {
          // If response data is an empty array, return false
          return false;
      } else {
          // If response data is not empty, return the data
          return response.data;
      }
  } catch (error) {
      console.error('Error checking ID:', error.message); // Log the error
      return false; // Indicate failure to check ID
  }
  };


  const submit = async (data, e) => {
    e.preventDefault();
    try {
      const isUnique = await checkID(data.id);
      if (isUnique) {
        setError('ID already exists');
      } else {
        // ID is unique, proceed with submission
        await axios.post(BASE_URL, data);
        console.log('Success');
        nav('../display');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <button onClick={() => { nav("..") }}>back</button>
      <form onSubmit={handleSubmit(submit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
            ID
          </label>
          <input {...register("id")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="id" type="text" />
          <span className='text-red-600'> {errors?.id?.message}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input {...register("name")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
          <span className='text-red-600'> {errors?.name?.message}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
            Position
          </label>
          <input {...register("position")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" />
          <span className='text-red-600'> {errors?.position?.message}</span>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
            Salary
          </label>
          <input {...register("salary")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salary" type="text" />
          <span className='text-red-600'> {errors?.salary?.message}</span>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
        {error && <span className="text-red-500">{error}</span>}
      </form>
    </div>

  )
}

export default Input