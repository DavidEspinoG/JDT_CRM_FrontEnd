const Client = ({ client }) => {
    return (
        <tr>
            <td className="border px-4 py-2">{client.name} {client.lastName}</td>
            <td className="border px-4 py-2">{client.company ? client.company : 'Independent'} </td>
            <td className="border px-4 py-2">{client.email} </td>
            <td className="border px-4 py-2">
                <button 
                    className="bg-red-600 w-full text-white rounded py-2 hover:bg-red-700"
                    type="button"
                    onClick={() => console.log(`Deleting id: ${client.id}`)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )

};

export default Client;