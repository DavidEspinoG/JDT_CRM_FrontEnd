"use client";
import SectionTitle from "../components/SectionTitle";
import FormError from "../components/FormError";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useMutation, gql } from "@apollo/client";
import { useRouter, redirect } from "next/navigation";
import { GET_CLIENTS_BY_SELLER } from "../page";

const NewClient = () => {
    const router = useRouter();
    const NEW_CLIENT = gql`
        mutation createNewClient($data: ClientInput) {
            newClient(data: $data) {
            name
            lastName
            company
            }
    }`;
    const [ createNewClient, { data, loading, error } ] = useMutation(NEW_CLIENT, {
        update(cache, data) {
            const { data: { newClient }} = data;
            const { getClientsBySeller } = cache.readQuery({ 
                query : GET_CLIENTS_BY_SELLER 
            });
            
            cache.writeQuery({
                query: GET_CLIENTS_BY_SELLER, 
                data: {
                    getClientsBySeller: [ ...getClientsBySeller, newClient ]
                }
            })
        }
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            company: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('The name is required'),
            password: Yup.string()
                .required('The password is required'),
            lastName: Yup.string()
                .required('The lastname is required'),
            company: Yup.string()
                .required('The company is required'),
            email: Yup.string()
                .required('The email is required'),
        }), 
        onSubmit: async (values) => {
            try {
                await createNewClient({ 
                    variables: {
                        data: {
                            ...values,
                        }
                }});
            } catch(e) {
                console.log(e)
            }
        }
    })
    const labelStyles = "text-gray-700 font-bold";
    const inputStyles = "shadow border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-sky-500";
    if(loading) return <p>loading...</p>;
    if(data?.newClient) {
        redirect('/'); 
    };
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
                    { formik.touched.name && formik.errors.name ? (
                        <FormError message={formik.errors.name} />
                    ) : null }
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
                    { formik.touched.lastName && formik.errors.lastName ? (
                        <FormError message={formik.errors.lastName} />
                    ) : null }
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
                    { formik.touched.company && formik.errors.company ? (
                        <FormError message={formik.errors.company} />
                    ) : null }
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
                    { formik.touched.password && formik.errors.password ? (
                        <FormError message={formik.errors.password} />
                    ) : null }
                    <input type="submit" value="Login" className="w-full bg-gray-800 hover:bg-gray-900 py-2 px-3 text-white capitalize mt-3"/>
                    { error ? (
                        <FormError message={error.message} />
                    ) : null }
                </form>
            </div>
        </section>
    )
};

export default NewClient; 