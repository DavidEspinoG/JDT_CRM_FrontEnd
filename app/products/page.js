"use client";
import SectionTitle from "../components/SectionTitle";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../lib/queries";
import Product from "../components/Product";

const Products = () => {
    const { data, loading } = useQuery(GET_PRODUCTS);

    if(loading) return <>loading...</>

    console.log(data?.getProducts)
    return (
        <>
            <SectionTitle>
                Products
            </SectionTitle>
            <table className="table-auto shadow-md mt-10 w-full w-lg">
                <thead className="bg bg-gray-800">
                    <tr className="text-white">
                        <th className="w-1/5 py-2">Name</th>
                        <th className="w-1/5 py-2">Price</th>
                        <th className="w-1/5 py-2">Stock</th>
                        <th className="w-1/5 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data?.getProducts?.map((product) => (
                        <Product product={product}/>
                    ))}
                </tbody>
            </table>

        </>
    )
};

export default Products;