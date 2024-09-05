"use client";
import SectionTitle from "./components/SectionTitle";
import { gql, useQuery } from "@apollo/client";
import Header from "./components/Header";

const Clients = () => {
    const GET_CLIENTS_BY_ID = gql`
        query getClientsBySeller {
            getClientsBySeller {
                id
                name
                lastName
                company
                email 
            }
        }`;
    const { data, loading, error } = useQuery(GET_CLIENTS_BY_ID);

    if(loading) return (<p>Loading...</p>) 
    console.log(data);
    return (
        <>  
            <Header />
            <SectionTitle>
                Products
            </SectionTitle>
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