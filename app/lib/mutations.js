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