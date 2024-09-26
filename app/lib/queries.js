import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query getProducts {
    getProducts {
        name
        items
        price
        id
    }
    }
`;

export const GET_PRODUCT_BY_ID = gql`
    query getProductById($id: ID!) {
        getProduct(id: $id) {
            name
            items
            price
        }
    }
`;