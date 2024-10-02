"use client";
import { useReducer } from 'react';
import ordersContext from './ordersContext';
import orderReducer from './ordersReducer';
import { SELECT_CLIENT } from '../types';

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

    return (
        <ordersContext.Provider value={{ state, updateClient }}>
            {children}
        </ordersContext.Provider>
    );
};

export default OrdersState;
