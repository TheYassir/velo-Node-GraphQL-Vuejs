import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    from,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createApolloProvider } from '@vue/apollo-option';

import { graphServerURL } from '../../docker-env-conf';
// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: graphServerURL,
});
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const logoutLink = onError(networkError => {
    if (networkError.statusCode === 401 || networkError.statusCode === 400) {
        localStorage.removeItem('token');

        // on reload pour effacer tout le state
        //window.location.reload();
    }
});

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

export const apolloClient = new ApolloClient({
    link: from([authLink, logoutLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
});
