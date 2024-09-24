'use client'
import { ACCESSTOKEN_STORAGE_KEY, setDefaultAccessToken, USER_STORAGE_KEY } from '@/lib/ajax';
import { RoutePath } from '@/lib/router'
import { useFormik } from 'formik';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Toast from '../share/component/toast';

import { register } from './sevice'

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  username: Yup.string()
    .min(5, 'Too Short!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password too short, at least 8 charactor!')
    .required('Required'),
  cpassword: Yup.string()
    .min(8, 'Password too short, at least 8 charactor!')
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});
export default function Register() {
  const router = useRouter()
  const [hasError, setHasError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const onSubmit = async (body: any) => {
    const response = await register(body)

    console.log('response',response)
    if (response?.accessToken) {
      localStorage.setItem(ACCESSTOKEN_STORAGE_KEY, response?.accessToken)
      localStorage.setItem(USER_STORAGE_KEY, response)
      setDefaultAccessToken()
      router.push(RoutePath.DASHBOARD)
    } else {
      setHasError(true)
      setMessage(response?.message)
    }
  }

  const { values, errors, setFieldValue, touched, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      cpassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  });

  useEffect(() => {
    console.log('errors', errors)
    console.log('touched', touched)
  }, [errors])
  return (<>
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      {(hasError) ? <Toast type='danger' message={message} onClose={() => setHasError(false)}></Toast> : <></>}
      <div className="max-w-4xl w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
          <div className="text-center mb-6">
            <a href="javascript:void(0)"><img
              src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-52 inline-block' />
            </a>
            <h4 className="text-gray-800 text-base font-semibold mt-6">Sign up into your account</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input name="email" type="text"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={(value) => { setFieldValue('email', value.target.value) }}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter email" />
                <div className='text-center'>
                  {errors.email && touched.email ? (
                    <span className='text-xs' style={{ 'color': 'red' }}>{errors.email}</span>
                  ) : null}
                </div>

              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Username</label>
                <input name="username" type="text"
                  onBlur={handleBlur}
                  value={values.username}
                  onChange={(value) => { setFieldValue('username', value.target.value) }}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter username" />
                <div className='text-center'>
                  {errors.username && touched.username ? (
                    <span className='text-xs' style={{ 'color': 'red' }}>{errors.username}</span>
                  ) : null}
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">First name</label>
                <input name="firstName" type="text"
                  onBlur={handleBlur}
                  value={values.firstName}
                  onChange={(value) => { setFieldValue('firstName', value.target.value) }}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter first name" />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Middle name</label>
                <input name="midleName" type="text"
                  onBlur={handleBlur}
                  value={values.middleName}
                  onChange={(value) => { setFieldValue('middleName', value.target.value) }}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter middle name" />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Last name</label>
                <input name="lastName" type="text"
                  onBlur={handleBlur}
                  value={values.lastName}
                  onChange={(value) => { setFieldValue('lastName', value.target.value) }}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter last name" />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input name="password" type="password"
                  onBlur={handleBlur}
                  value={values.password}
                  onChange={(value) => { setFieldValue('password', value.target.value) }}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter password" />
                <div className='text-center'>
                  {errors.password && touched.password ? (
                    <span className='text-xs' style={{ 'color': 'red' }}>{errors.password}</span>
                  ) : null}
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <input name="cpassword" type="password"
                  onBlur={handleBlur}
                  value={values.cpassword}
                  onChange={(value) => { setFieldValue('cpassword', value.target.value) }}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-gray-500" placeholder="Enter confirm password" />
                <div className='text-center'>
                  {errors.cpassword && touched.cpassword ? (
                    <span className='text-xs' style={{ 'color': 'red' }}>{errors.cpassword}</span>
                  ) : null}
                </div>
              </div>
              <div className="relative">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none absolute bottom-0">
                  Create an account
                </button>
              </div>
            </div>


          </form>
          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link href={RoutePath.LOGIN} className="text-gray-600 font-semibold hover:text-gray-500 hover:underline ml-1">Login here</Link></p>
        </div>
      </div>
    </div>
  </>)
}