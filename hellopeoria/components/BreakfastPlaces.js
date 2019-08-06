import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from './Place';
import Loading from './Loading';
import { perPage } from '../config';

const ALL_PLACES_QUERY = gql`
  query {
    places(orderBy: name_ASC, where: {
      OR:  [{ description_contains: "breakfast" }, { tags_contains: "breakfast" }] 
      
    }) {
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

class BreakfastPlaces extends Component {
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
              <div className="card-wrapper">
                {data.places.map(place => (
                  <Place place={place} key={place.id} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default BreakfastPlaces;
export { ALL_PLACES_QUERY };
