import { gql } from "@apollo/client"

export const NEW_PRODUCT = gql`
    mutation newProduct($data: NewProductInput) {
        newProduct(data: $data) {
            id
            name
            items
            price
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation editProduct($id: ID!, $input: NewProductInput) {
        updateProduct(id: $id, input: $input) {
            name
            items
            price
        }
    }
`;