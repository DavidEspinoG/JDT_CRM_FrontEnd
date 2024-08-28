'use client'
import SectionTitle from "../components/SectionTitle";
import { useFormik } from "formik";
import * as Yup from 'yup';
import FormError from "../components/FormError";
import { gql, useMutation } from "@apollo/client";
import { useState } from 'react';
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const [ successMessage, setSuccessMessage ] = useState(null);
    const LOGIN_MUTATION = gql`
        mutation AuthenticateUser($data: authenticateUserInput) {
            authenticateUser(data: $data) {
                token
        }
    }`;
    const [ loginUser, { error } ] = useMutation(LOGIN_MUTATION);
    const formik = useFormik({
        initialValues: {
            email: '', 
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                    .email('Provide a valid email')
                    .required('The email is mandatory'),
            password: Yup.string()
                    .required('The password is a mandatory field')    
        }), 
        onSubmit: async (values) => {
            try {
                const {data} = await loginUser({
                    variables: {
                        data: { ...values }
                    }
                });
                const token = data.authenticateUser.token
                if(token) {
                    localStorage.setItem('token', token);
                    setSuccessMessage('User succesfully logged id, redirecting...');
                    setTimeout(() => {
                        router.push('/')
                    }, 3000)
                } else {
                    console.log('error authenticating the user')
                }
            } catch(e) {
                console.log(e)
            }
        },
    });



    const labelStyles = "text-gray-700 font-bold";
    const inputStyles = "shadow border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
    return (
        <section className="flex w-full justify-center h-full items-center">
            <div className="p-3">
                <SectionTitle className={'text-center mb-5'}>
                    Login
                </SectionTitle>
                <form className="bg-white p-7 flex flex-col gap-2 rounded" onSubmit={formik.handleSubmit}>
                    <label className={labelStyles} htmlFor="email">
                        Email
                    </label>
                    <input 
                        placeholder="Your email" 
                        id="email" 
                        className={inputStyles} 
                        onChange={formik.handleChange} 
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        />
                    { formik.touched.email && formik.errors.email ? (
                        <FormError message={formik.errors.email} />
                    ) : null }
                    <label className={labelStyles} htmlFor="password">
                        Password
                    </label>
                    <input 
                        placeholder="Your password"   
                        id="password" 
                        className={inputStyles} 
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.password &&  formik.errors.password ? (
                        <FormError message={formik.errors.password} />
                    ) : null }
                    <input type="submit" value="Login" className="w-full bg-gray-800 hover:bg-gray-900 py-2 px-3 text-white capitalize mt-3"/>
                    { error ? <FormError message={error.message} /> : null}
                    { successMessage ? <div>{successMessage}</div>: null}
                </form>
            </div>
        </section>
    )
};

export default Login; 