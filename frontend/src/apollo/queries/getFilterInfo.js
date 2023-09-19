import gql from 'graphql-tag';

export const GET_FILTER_INFO = gql`
    query GetFilterInfo {
        getKindsOfBike {
            label
            id
        }
        getPointsOfSale {
            label
            id
        }
    }
`;
