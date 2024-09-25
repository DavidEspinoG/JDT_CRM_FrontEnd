"use client";
import SectionTitle from "../components/SectionTitle";
import FormError from "../components/FormError";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useMutation, gql } from "@apollo/client";
import { useRouter, redirect } from "next/navigation";
import { GET_CLIENTS_BY_SELLER } from "../page";

const NewProduct = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            items: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('The name is required'),
            price: Yup.number()
                .required('The password is required')
                .positive('The value should be greater than zero'),
            items: Yup.number()
                .required('The lastname is required')
                .positive('The value should be greater than zero')
                .integer('The value should not contain decimals'),
        }), 
        onSubmit: async (values) => {
            try {
                console.log(values);
            } catch(e) {
                console.log(e)
            }
        }
    })
    const labelStyles = "text-gray-700 font-bold";
    const inputStyles = "shadow border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-sky-500";
    // if(loading) return <p>loading...</p>;
    // if(data?.newClient) {
    //     redirect('/'); 
    // };
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
                        placeholder="Product name" 
                        id="name" 
                        className={inputStyles}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                    />
                    { formik.touched.name && formik.errors.name ? (
                        <FormError message={formik.errors.name} />
                    ) : null }
                    <label className={labelStyles} htmlFor="lastName">
                        Price
                    </label>
                    <input 
                        placeholder="Price" 
                        id="price" 
                        className={inputStyles} 
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.price && formik.errors.price ? (
                        <FormError message={formik.errors.price} />
                    ) : null }
                    <label className={labelStyles} htmlFor="company">
                        Items
                    </label>
                    <input 
                        placeholder="Available items" 
                        id="items" 
                        className={inputStyles}
                        value={formik.values.items}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                    />
                    { formik.touched.items && formik.errors.items ? (
                        <FormError message={formik.errors.items} />
                    ) : null }
                    
                    <input type="submit" value="Login" className="w-full bg-gray-800 hover:bg-gray-900 py-2 px-3 text-white capitalize mt-3"/>
                </form>
            </div>
        </section>
    )
};

export default NewProduct; 