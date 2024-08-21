'use client'
import SectionTitle from "../components/SectionTitle";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import FormError from "../components/FormError";
import { useMutation, gql } from "@apollo/client";

const SignIn = () => {
    const NEW_USER_MUTATION = gql`
        mutation newUser($data: newUserInput) {
            newUser(data: $data) {
                name
                lastName
                email
                id
            }
    }`;
    const [ createNewUser, { error } ] = useMutation(NEW_USER_MUTATION);
    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: object({
            name: string().required('Name is a required field'),
            lastName: string().required('Lastname is a required field'), 
            email: string().email().required('E-mail is a required field'), 
            password: string().min(5, 'The password should have at least 5 characters')
        }), 
        onSubmit: async (values) => {
            try {
                const {data} = await createNewUser({
                    variables: {
                        data: {...values}
                    }
                })
                console.log('user created', data)
            } catch(e) {
                console.log(e?.message)
            }
        }
    });

    const labelStyles = "text-gray-700 font-bold";
    const inputStyles = "shadow border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-sky-500";
    return (
        <>  
        <section className="flex w-full justify-center h-full items-center">
            <div className="w-[400px]">
                <SectionTitle className={'text-center mb-5'}>
                    Sign in
                </SectionTitle>
                <form className="bg-white p-7 flex flex-col gap-2 rounded" onSubmit={formik.handleSubmit}>
                    <label className={labelStyles} htmlFor="name">
                        Name
                    </label>
                    <input placeholder="Your name" id="name" className={inputStyles} value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    { formik.touched.name && formik.errors.name ? (
                        <FormError message={formik.errors.name} />
                    ) : null }
                    <label className={labelStyles} htmlFor="lastname">
                        Last Name
                    </label>
                    <input placeholder="Your last name" id="lastName" className={inputStyles} value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    { formik.touched.lastName && formik.errors.lastName ? (
                        <FormError message={formik.errors.lastName} />
                    ) : null }
                    <label className={labelStyles} htmlFor="email">
                        Email
                    </label>
                    <input placeholder="Your email" id="email" className={inputStyles} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    { formik.touched.email && formik.errors.email ? (
                        <FormError message={formik.errors.email} />
                    ) : null }
                    <label className={labelStyles} htmlFor="password">
                        Password
                    </label>
                    <input placeholder="Your password" id="password" className={inputStyles} type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    { formik.touched.password &&  formik.errors.password ? (
                        <FormError message={formik.errors.password} />
                    ) : null }
                    <input type="submit" value="Sign in" className="w-full bg-gray-800 hover:bg-gray-900 py-2 px-3 text-white capitalize mt-3"/>
                    { error ? <FormError message={context?.error?.message} /> : null}
                </form>
            </div>
        </section>
        </>
    )
};

export default SignIn;