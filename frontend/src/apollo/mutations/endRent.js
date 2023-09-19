import gql from 'graphql-tag';

export const STOP_RENT = gql`
    mutation StopRent($input: StopRentInput!) {
        stopRent(input: $input) {
            id
        }
    }
`;
