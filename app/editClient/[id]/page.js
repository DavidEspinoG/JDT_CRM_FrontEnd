"use client";
import { useParams } from "next/navigation";
import SectionTitle from "@/app/components/SectionTitle";
import FormError from "@/app/components/FormError";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useQuery, gql, useMutation } from "@apollo/client";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";

const EditClient = () => {
    const router = useRouter();
    const params = useParams();
    const GET_CLIENT_BY_ID = gql`
        query getClientById($id: ID!) {
            getClientById(id: $id){
                name
                lastName
                company
            }
        }
    `;
    const { data, loading } = useQuery(GET_CLIENT_BY_ID, {
        variables: {
            id: params.id
        }
    });
    const UPDATE_CLIENT = gql`
        mutation updateClient($id: ID!, $data: updateClientInput!) {
            updateClient(id: $id, data: $data) {
                name
                lastName
                company
            }
        }
    `;
    const [ updateClient ] = useMutation(UPDATE_CLIENT);
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('The name is required'),
        lastName: Yup.string()
            .required('The lastname is required'),
        company: Yup.string()
            .required('The company is required'),
    });
    const handleEdit = async (values) => {
        console.log(values)
        try {
            const { name, lastName, company} = values;
            await updateClient({
                variables: {
                    id: params.id,
                    data: {
                        name, 
                        lastName,
                        company
                    }
                }
            })
            router.push('/')
        } catch(e) {
            console.log(e)
        }
    };

    if(loading) return <>Loading...</>;
    const { getClientById } = data;
    const labelStyles = "text-gray-700 font-bold";
    const inputStyles = "shadow border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-sky-500";
    return (
        <>
        <Header />
        <section className="flex w-full justify-center h-full items-center">
            <div className="p-3">
                <SectionTitle className={'text-center mb-5'}>
                    New Client
                </SectionTitle>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={getClientById}
                    onSubmit={(values) => handleEdit(values)}
                >
                    {(formik) => (
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
                        <input type="submit" value="Update client data" className="w-full bg-gray-800 hover:bg-gray-900 py-2 px-3 text-white capitalize mt-3"/>
                    </form>
                    )}
                </Formik>
                
            </div>
        </section>
        </>
    );

};

export default EditClient;