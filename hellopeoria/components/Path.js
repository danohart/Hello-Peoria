import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from './Place';

const PATH_PLACES_QUERY = gql`
  query($path: String!) {
    places(orderBy: name_ASC, where: { paths: $path }) {
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

class PathPlaces extends Component {
  render() {
    return (
      <div>
        <Query query={PATH_PLACES_QUERY} variables={{ path: this.props.paths }}>
          {({ data, error, loading }) => {
            if (loading) return <p>Please wait...</p>;
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

export default PathPlaces;
export { PATH_PLACES_QUERY };
