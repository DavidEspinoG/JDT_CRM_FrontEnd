"use client";
import SectionTitle from "../components/SectionTitle";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../lib/queries";
import Product from "../components/Product";
import Link from "next/link";
import Header from "../components/Header";

const Products = () => {
    const { data, loading } = useQuery(GET_PRODUCTS);

    if(loading) return <>loading...</>

    return (
        <>
            <SectionTitle>
                Products
            </SectionTitle>
            <Header />
            <Link
                href="/newProduct"
                className="bg-slate-700 text-white uppercase text-sm py-2 px-3 rounded hover:bg-slate-900 inline-block mt-3"
            > 
                Add new product
            </Link>
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
                        <Product product={product} key={product.id}/>
                    ))}
                </tbody>
            </table>

        </>
    )
};

export default Products;