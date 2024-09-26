"use client";
import { useParams } from "next/navigation";
import SectionTitle from "@/app/components/SectionTitle";
import FormError from "@/app/components/FormError";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useQuery, useMutation } from "@apollo/client";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";
import { GET_PRODUCT_BY_ID } from "@/app/lib/queries";
import { UPDATE_PRODUCT } from "@/app/lib/mutations";

const EditProduct = () => {
    const params = useParams();
    const { data, loading } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: params.id
        }
    });
    const [ updateProduct ] = useMutation(UPDATE_PRODUCT, { refetchQueries: ['getProducts']});
    const router = useRouter();
    const validationSchema = Yup.object({
        name: Yup.string()
        .required('The name is required'),
        price: Yup.number()
            .required('The password is required')
            .positive('The value should be greater than zero'),
        items: Yup.number()
            .required('The lastname is required')
            .positive('The value should be greater than zero')
            .integer('The value should not contain decimals'),
    });
    const handleEdit = async (values) => {
        console.log(values)
        try {
            const { name, items, price} = values;
            await updateProduct({
                variables: {
                    id: params.id,
                    input: {
                        name, 
                        items: parseInt(items),
                        price: parseInt(price)
                    }
                }
            })
            router.push('/products')
        } catch(e) {
            console.log(e)
        }
    };

    if(loading) return <>Loading...</>;
    const { getProduct } = data;
    const labelStyles = "text-gray-700 font-bold";
    const inputStyles = "shadow border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-sky-500";
    return (
        <>
        <Header />
        <section className="flex w-full justify-center h-full items-center">
            <div className="p-3">
                <SectionTitle className={'text-center mb-5'}>
                    Edit Product
                </SectionTitle>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={getProduct}
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
                        <label className={labelStyles} htmlFor="items">
                            Items
                        </label>
                        <input 
                            placeholder="Items" 
                            id="items" 
                            className={inputStyles} 
                            value={formik.values.items}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        { formik.touched.items && formik.errors.items ? (
                            <FormError message={formik.errors.items} />
                        ) : null }
                        <label className={labelStyles} htmlFor="price">
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
                        <input type="submit" value="Update product" className="w-full bg-gray-800 hover:bg-gray-900 py-2 px-3 text-white capitalize mt-3"/>
                    </form>
                    )}
                </Formik>
                
            </div>
        </section>
        </>
    );

};

export default EditProduct;