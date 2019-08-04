import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { perPage } from '../config';
import Head from 'next/head';
import Link from 'next/link';
import Loading from './Loading';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    placesConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (error) return <Error error={error} />;
      if (loading) return <Loading />;
      const count = data.placesConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;
      return (
        <div className="pagination">
          <Head>
            <title>
              Hello Peoria // Places {page} of {pages}{' '}
            </title>
          </Head>
          <Link
            prefetch
            href={{ pathname: 'places', query: { page: page - 1 } }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              &#xab; Previous
            </a>
          </Link>
          <div className="num-pages">
            {props.page} of {pages}
          </div>
          <Link
            prefetch
            href={{ pathname: 'places', query: { page: page + 1 } }}
          >
            <a className="next" aria-disabled={page >= { pages }}>
              Next &#xbb;
            </a>
          </Link>
        </div>
      );
    }}
  </Query>
);

export default Pagination;
