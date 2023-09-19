import gql from "graphql-tag";

export const GET_POINTS_OF_SALE = gql`
  query GetPointsOfSale {
    getPointsOfSale {
      id
      label
    }
  }
`;
