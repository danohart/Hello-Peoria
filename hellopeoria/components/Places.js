import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from './Place';
import Pagination from './Pagination';
import { perPage } from '../config';
import Meta from './Meta';

const ALL_PLACES_QUERY = gql`
    query ($skip: Int = 0, $first: Int = ${perPage}) {
        places(first: $first, skip: $skip, orderBy: name_ASC) {
            id
            name
            description
            address
            image
            category
            paths
        }
    }
`;

class Places extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Query
          query={ALL_PLACES_QUERY}
          variables={{ skip: this.props.page * perPage - perPage }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <div className="card-wrapper">
                {data.places.map(place => (
                  <Place place={place} key={place.id} />
                ))}
              </div>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </div>
    );
  }
}

export default Places;
export { ALL_PLACES_QUERY };
