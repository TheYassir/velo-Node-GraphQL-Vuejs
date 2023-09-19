import gql from 'graphql-tag';

export const GET_BIKE = gql`
    query GetBike($bikeId: Int!, $currency: String!) {
        getBike(id: $bikeId) {
            id
            number
            status
            point_of_sale {
                label
                id
            }
            kind_of_bike {
                id
                label
                price
                priceInOtherCurrency(currency: $currency)
            }
            rents {
                id
                client_firstname
                client_lastname
                start_date
                return_date_planned
                return_date
                rent_point_of_sale {
                    label
                }
                return_point_of_sale {
                    label
                }
            }
        }
    }
`;
