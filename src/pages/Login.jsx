import React, { useCallback, useState } from 'react';
import Home2 from '../assets/image/home.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().max(15,"maximum 15 character").
      required('Required'),
      email:Yup.string().email('invalid email address').required('Required'),
      password:Yup.string().min(8,"minimum 8 char required").matches(/[a-zA-z]/).required('Required')
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [varient,setVarient] = useState('login');

  const toggleVarient = useCallback(() => {
    setVarient((current) => current === 'login' ? 'register' : 'login')
  },[])

  return (
    <div className="bg-[url('./assets/image/bg.jfif')] bg-cover flex items-center justify-center min-h-screen">
      <div className="hidden lg:block lg:w-1/2">
        <img src={Home2} alt="Instagram home page" className="h-[540px] pl-[200px]" />
      </div>
      <div className="w-full max-w-md p-8">
        <h1 className="text-4xl font-bold mb-4">Instagram</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <h1 className='font-bold text-4xl mb-4'>{varient === 'login' ? "Login" : "Register" }</h1>
            {varient === 'register' && (
            <div>
            <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.fullName && formik.errors.fullName ?
            <div>{formik.errors.fullName}</div> : null }
          </div> )}
          </div> 
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <div className='mt-5'>
            <p  className='inline-block'>{varient === 'login' ? "New to Instagram ?" : "Have an account ?" }</p>
            <span onClick={toggleVarient} className='text-white cursor-pointer' >{varient === 'login' ? ' Sign up' : ' Login'} </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
