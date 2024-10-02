import { useState, useEffect, useId, useContext, use } from 'react';
import { useQuery } from '@apollo/client';
import Select from 'react-select';
import { GET_PRODUCTS } from '../lib/queries';
import ordersContext from '../context/orders/ordersContext';

const ProductSelect = () => {
    const { updateProduct, state } = useContext(ordersContext);
    const { data, loading } = useQuery(GET_PRODUCTS);
    const [ isMounted, setIsMounted ] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])
    const id = useId();

    useEffect(() => {
        console.log(state)
    }, [state])

    if(loading) return null;
    return  isMounted ? (
        <>  
            <p className="">Select products</p>
            <Select 
                options={data.getProducts}
                instanceId={id}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.name}
                isMulti
                onChange={(products) => updateProduct(products)}
            />
        </>
    ) : null;
};

export default ProductSelect;