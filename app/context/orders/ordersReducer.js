import { SELECT_CLIENT, 
    SELECT_PRODUCT, 
    PRODUCT_QUANTITY } from '../types';

const orderReducer = (state, action) => {
    switch(action.type) {
        case SELECT_CLIENT: 
            return {
                ...state, 
                client: action.payload
            }
        case SELECT_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case PRODUCT_QUANTITY: 
            return {
                ...state, 
                products: state.products.map((product) => {
                    let updatedProduct = {...product}
                    if(product.id == action.payload.id) {
                        updatedProduct.quantity = action.payload.quantity
                    }
                    return updatedProduct;
                }) 
            }
        default:
            return state;
    }
}
export default orderReducer;