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

    if(loading) return null;
    return  isMounted ? (
        <>  
            <p className="bg-white text-gray-700 py-2 px-3 border-l-4 border-l-blue-500 mb-3 mt-3">Select products</p>
            <Select 
                options={data.getProducts}
                instanceId={id}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.name}
                isMulti
                onChange={(products) => {
                    let cleanProducts = products.map((product) => ({id: product.id, quantity: 0, name: product.name, price: product.price}))
                    updateProduct(cleanProducts)
                }}
            />
        </>
    ) : null;
};

export default ProductSelect;