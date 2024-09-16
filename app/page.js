"use client";
import SectionTitle from "./components/SectionTitle";
import { gql, useQuery } from "@apollo/client";
import Header from "./components/Header";
import { redirect } from "next/navigation";
import Link from "next/link";

export const GET_CLIENTS_BY_SELLER = gql`
    query getClientsBySeller {
        getClientsBySeller {
            id
            name
            lastName
            company
            email 
        }
}`;

const Clients = () => {
    const { data, loading, error } = useQuery(GET_CLIENTS_BY_SELLER);

    if(loading) return (<p>Loading...</p>) 
    if(!data) redirect('/login')
    return (
        <>  
            <Header />
            <SectionTitle>
                Products
            </SectionTitle>
            <Link
                href="/newClient"
                className="bg-slate-700 text-white uppercase text-sm py-2 px-3 rounded hover:bg-slate-900 inline-block mt-3"
            > 
                Add new client
            </Link>
            <table className="table-auto shadow-md mt-10 w-full w-lg">
                <thead className="bg bg-gray-800">
                    <tr className="text-white">
                        <th className="w-1/5 py-2">Nombre</th>
                        <th className="w-1/5 py-2">Empresa</th>
                        <th className="w-1/5 py-2">E-mail</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data?.getClientsBySeller?.map((client) => (
                        <tr key={client.id}>
                            <td className="border px-4 py-2">{client.name} {client.lastName}</td>
                            <td className="border px-4 py-2">{client.company ? client.company : 'Independent'} </td>
                            <td className="border px-4 py-2">{client.email} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};

export default Clients;