"use client";
import SectionTitle from "../components/SectionTitle";
import FormError from "../components/FormError";
import { useFormik } from "formik";

const NewClient = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            company: '',
            email: '',
            password: '',
        }, 
        onSubmit: (values) => {
            console.log(values);
        }
    })
    const labelStyles = "text-gray-700 font-bold";
    const inputStyles = "shadow border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
    return (
        <section className="flex w-full justify-center h-full items-center">
            <div className="p-3">
                <SectionTitle className={'text-center mb-5'}>
                    New Client
                </SectionTitle>
                <form className="bg-white p-7 flex flex-col gap-2 rounded" onSubmit={formik.handleSubmit}>
                    <label className={labelStyles} htmlFor="name">
                        Name
                    </label>
                    <input 
                        placeholder="Your name" 
                        id="name" 
                        className={inputStyles}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                    />
                    <label className={labelStyles} htmlFor="lastName">
                        Last Name
                    </label>
                    <input 
                        placeholder="Your lastname" 
                        id="lastName" 
                        className={inputStyles} 
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label className={labelStyles} htmlFor="company">
                        Company
                    </label>
                    <input 
                        placeholder="Your company name" 
                        id="company" 
                        className={inputStyles}
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                    />
                    <label className={labelStyles} htmlFor="email">
                        Email
                    </label>
                    <input 
                        placeholder="Your email" 
                        id="email" 
                        className={inputStyles}
                        values={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                    />
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
                    <input type="submit" value="Login" className="w-full bg-gray-800 hover:bg-gray-900 py-2 px-3 text-white capitalize mt-3"/>
                </form>
            </div>
        </section>
    )
};

export default NewClient; 