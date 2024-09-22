
import Swal from 'sweetalert2';
import { gql, useMutation } from "@apollo/client";
import { GET_CLIENTS_BY_SELLER } from '../page';
import { useRouter } from 'next/navigation';

const Client = ({ client }) => {
    const router = useRouter();
    const DELETE_CLIENT = gql`
        mutation deleteClient($id: ID!) {
            deleteClient(id: $id)
        }
    `;
    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        variables: {
            id: client.id,
        },
        update(cache, data) {
            const { data: { deleteClient } } = data;
            const { getClientsBySeller } = cache.readQuery({ query: GET_CLIENTS_BY_SELLER });
            const filteredCache = getClientsBySeller.filter((client) => {
                return client.id !== deleteClient  
            });
            cache.writeQuery({
                query: GET_CLIENTS_BY_SELLER,
                data: {
                    getClientsBySeller: filteredCache,
                }
            })
        }
    });

    const handleDelete = async () => {
        const userResponse = await Swal.fire({
            title: 'Are you sure you want to delete it?',
            text: 'You will not be able to revert this',
            icon: 'warning',
            showCancelButton: true, 
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel'
        })
        if(userResponse?.isConfirmed) {
            try {
                await deleteClient();
                Swal.fire({
                    title: `The client ${client.name} has been deleted`,
                    icon: 'success'
                })
            } catch(e) {
                console.log(e);
            }
        }           
    };

    const handleEdit = () => {
        router.push(`/editClient/${client.id}`);
    };

    return (
        <tr>
            <td className="border px-4 py-2">{client.name} {client.lastName}</td>
            <td className="border px-4 py-2">{client.company ? client.company : 'Independent'} </td>
            <td className="border px-4 py-2">{client.email} </td>
            <td className="flex gap-2 border px-4 py-2">
                <button 
                    className="bg-red-600 w-full text-white rounded py-2 hover:bg-red-700"
                    type="button"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button 
                    className="bg-yellow-500 w-full text-white rounded py-2 hover:bg-yellow-600"
                    type="button"
                    onClick={handleEdit}
                >
                    Edit
                </button>
            </td>
        </tr>
    )

};

export default Client;