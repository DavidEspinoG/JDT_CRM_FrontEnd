
import Swal from 'sweetalert2';
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';
import { DELETE_PRODUCT } from '../lib/mutations';

const Product = ({ product }) => {
    const router = useRouter();
    const [ deleteProduct ] = useMutation(DELETE_PRODUCT, { refetchQueries: ['getProducts']});
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
                await deleteProduct({
                    variables: {
                        id: product.id
                    }
                });
                Swal.fire({
                    title: `The product ${product.name} has been deleted`,
                    icon: 'success'
                })
            } catch(e) {
                console.log(e);
            }
        }           
    };

    const handleEdit = () => {
        router.push(`/editProduct/${product.id}`);
    };

    return (
        <tr>
            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2">${product.price} </td>
            <td className="border px-4 py-2">{product.items} </td>
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

export default Product;