import { useEffect, useState, useId, useContext } from "react";
import { useQuery } from "@apollo/client";
import Select from "react-select";
import { GET_CLIENTS_BY_SELLER } from "../lib/queries";
import ordersContext from "../context/orders/ordersContext";

const SelectClient = () => {
    const { updateClient } = useContext(ordersContext);
    const { data, loading, error } = useQuery(GET_CLIENTS_BY_SELLER)
    const [ isMounted, setIsMounted ] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])
    const id = useId();
    if(loading) return null;
    const { getClientsBySeller } = data;

    return isMounted ? (
        <>
            <p className="">Select client</p>
            <Select
                options={getClientsBySeller}
                instanceId={id}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.name}
                onChange={(client) => updateClient(client)} 
            />
        </>
    ) : null;
};

export default SelectClient;