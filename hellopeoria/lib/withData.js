import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { endpoint, prodEndpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'https://hellochicago.herokuapp.com/admin/api'
        : prodEndpoint,
    cache: new InMemoryCache({
      addTypename: false,
    }),
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
