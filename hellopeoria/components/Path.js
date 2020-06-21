import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from './Place';
import Loading from './Loading';

const PATH_PLACES_QUERY = gql`
  query($path: PathNameType!) {
    allPeoriaPlaces(
      sortBy: name_ASC
      where: { AND: [{ mainPath: { name: $path } }] }
    ) {
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
    }
  }
`;

class PathPlaces extends Component {
  render() {
    return (
      <div>
        <Query query={PATH_PLACES_QUERY} variables={{ path: this.props.paths }}>
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
      </div>
    );
  }
}

export default PathPlaces;
export { PATH_PLACES_QUERY };
