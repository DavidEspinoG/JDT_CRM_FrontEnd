import { useReducer } from 'react';
import ordersContext from './ordersContext';
import orderReducer from './ordersReducer';


const OrdersState = ({ children }) => {

    const initialState = {
        clients: [],
        products: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(orderReducer, initialState);

    return (
        <ordersContext.Provider value={{ state, dispatch }}>
            {children}
        </ordersContext.Provider>
    );
};

export default OrdersState;
