import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { perPage } from '../config';

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
        {({data, loading, error}) => {
            if(error) return <Error error={error} />;
            if(loading) return <p>Loading...</p>;
            const count = data.placesConnection.aggregate.count;
            const pages = Math.ceil(count / perPage);
            return (
                <div className="pagination">
                    1 of {pages}
                </div>
            );
        }}    
    </Query>
)

export default Pagination;