import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from './Place';
import Loading from './Loading';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_PLACES_QUERY = gql`
    query ($skip: Int = 0, $first: Int = ${perPage}) {
        allPeoriaPlaces(first: $first, skip: $skip, sortBy: name_ASC) {
          id
          name
          description
          address {
            formattedAddress
          }
          altAddress
          image
          mainCategory {
            name
          }
          mainPath { 
            name 
          }
          tags
        }
    }
`;

class Places extends Component {
  render() {
    return (
      <div>
        <Query
          query={ALL_PLACES_QUERY}
          variables={{ skip: this.props.page * perPage - perPage }}
        >
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <div className='card-wrapper'>
                {data.allPeoriaPlaces.map((place) => (
                  <Place place={place} key={place.id} />
                ))}
              </div>
            );
          }}
        </Query>
        {/* <Pagination page={this.props.page} /> */}
      </div>
    );
  }
}

export default Places;
export { ALL_PLACES_QUERY };
