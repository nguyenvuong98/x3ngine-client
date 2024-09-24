'use client'

import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from './service';
import { RoutePath } from '@/lib/router';
import Toast from '../share/component/toast';
import { useEffect, useState } from 'react';
import { ACCESSTOKEN_STORAGE_KEY, setDefaultAccessToken, USER_STORAGE_KEY } from '@/lib/ajax';
import InputError from '../share/component/inputError';



const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, 'Too Short!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password too short, at least 8 charactor!')
        .required('Required'),
});
export default function Login() {
    const router = useRouter()
    const [hasError, setHasError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    //const { data, error, isLoading } = useSWR(path, fetcher)

    useEffect(() => {
        console.log('hasError', hasError)
    }, [hasError])
    const onSubmit = async (body: any) => {
        const response = await login(body)

        console.log('response', response)

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
            password: ''
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            onSubmit(values)
        },
    });


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-h-screen">
                {(hasError) ? <Toast type='danger' message={message} onClose={() => setHasError(false)}></Toast> : <></>}
                <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form method="POST" className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        required
                                        onBlur={handleBlur}
                                        value={values.username}
                                        placeholder='Enter username'
                                        onChange={(value) => { setFieldValue('username', value.target.value) }}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <InputError errors={errors} touched={touched} field={'username'}></InputError>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-gray-800 hover:text-gray-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder='Enter password'
                                        onChange={(value) => setFieldValue('password', value.target.value)}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <InputError errors={errors} touched={touched} field={'password'}></InputError>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"

                                    className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                        {/* <Formik
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={values => {
                                // same shape as initial values
                                onSubmit(values)
                            }}
                        >
                            {({ errors, touched }) => (
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <Field name="username" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                            <div className="text-sm">
                                                <a href="#" className="font-semibold text-gray-800 hover:text-gray-500">
                                                    Forgot password?
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Field name="password" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            
                                        </div>
                                    </div>
                                    {errors.password && touched.password ? (
                                        <div>{errors.password}</div>
                                    ) : null}
                                    <div>
                                        <button
                                            type="submit"

                                            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            )}


                        </Formik> */}
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="#" className="font-semibold leading-6 text-gray-800 hover:text-gray-500" onClick={() => router.push(RoutePath.REGISTER)}>
                                Register now
                            </a>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}