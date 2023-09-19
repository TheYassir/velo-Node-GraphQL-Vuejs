import gql from "graphql-tag";

export const GET_ALL_BIKES = gql`
  query GetAllBikes($currency: String!, $filter: Filter) {
    getBikes(filter: $filter) {
      id
      number
      status
      kind_of_bike {
        id
        label
        price
        priceInOtherCurrency(currency: $currency)
      }
      point_of_sale {
        label
        id
      }
    }
  }
`;
