import React, { useCallback, useState } from 'react';
import Home2 from '../assets/image/home.png';
import { useFormik } from 'formik';
import {app} from '../assets/firebase'
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import gLogo from '../assets/image/gLogo.webp'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().max(15,"maximum 15 character"),
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

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const signIn = () =>{

  signInWithPopup(auth,provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      const email = error.customData.email;

      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  const emailCreate = (email,password) => {
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCrendential) => {
      const user = userCrendential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  const emailSign = (email,password) => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCrendential) => {
      const user = userCrendential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }


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
            
            onClick={() => {
              formik.handleSubmit();

              if(varient === 'register'){
                emailCreate(formik.values.email,formik.values.password);
              }
              else{
                emailSign(formik.values.email,formik.values.password);
              }
            }
            }

            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {varient === 'login' ? "Login" : "Register"}
          </button>
          <div className='mt-5'>
            <p  className='inline-block'>{varient === 'login' ? "New to Instagram ?" : "Have an account ?" }</p>
            <span onClick={toggleVarient} className='text-white cursor-pointer' >{varient === 'login' ? ' Sign up' : ' Login'} </span>
          </div>
        </form>
        <div>
          <h1 className='text-4xl mb-4 mt-5'>OR</h1>
          <div onClick={signIn} className='cursor-pointer'>
            <img src={gLogo} className='w-[72px] rounded-[40px] mb-4' alt="google-logo"  />
            <p className=''>Sign in using Google</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
