"use client";
import { useReducer } from 'react';
import ordersContext from './ordersContext';
import orderReducer from './ordersReducer';
import { SELECT_CLIENT, SELECT_PRODUCT } from '../types';

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
        dispatch({
            type: SELECT_PRODUCT,   
            payload: products
        })
    }

    return (
        <ordersContext.Provider value={{ 
            state, 
            updateClient,
            updateProduct, 
        }}>
            {children}
        </ordersContext.Provider>
    );
};

export default OrdersState;
