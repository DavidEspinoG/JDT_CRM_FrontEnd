"use client";
import { useReducer } from 'react';
import ordersContext from './ordersContext';
import orderReducer from './ordersReducer';
import { SELECT_CLIENT, SELECT_PRODUCT, PRODUCT_QUANTITY } from '../types';

const OrdersState = ({ children }) => {

    const initialState = {
        client: {},
        products: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(orderReducer, initialState);

    const updateClient = (client) => {
        dispatch({
            type: SELECT_CLIENT, 
            payload: client,
        })
    };

    const updateProduct = (products) => {
        let newState;
        if(state.products.length > 0) {
            newState = products.map(product => {
                const newObject = state.products.find(productState => productState.id === product.id);
                return {
                    ...product, 
                    ...newObject
                }
            })
        } else {
            newState = products;
        }

        dispatch({
            type: SELECT_PRODUCT,   
            payload: newState
        })
    }

    const updateQuantity = (update) => {
        dispatch({
            type: PRODUCT_QUANTITY,
            payload: update,
        })
    }

    return (
        <ordersContext.Provider value={{ 
            state, 
            updateClient,
            updateProduct,
            updateQuantity 
        }}>
            {children}
        </ordersContext.Provider>
    );
};

export default OrdersState;
