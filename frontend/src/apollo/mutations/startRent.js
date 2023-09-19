import { gql } from '@apollo/client';

export const START_RENT = gql`
    mutation StartRent($input: RentInput!) {
        addRent(input: $input) {
            id
        }
    }
`;
