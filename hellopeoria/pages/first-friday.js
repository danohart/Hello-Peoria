import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from '../components/Place';
import Loading from '../components/Loading';
import { perPage } from '../config';

const ALL_PLACES_QUERY = gql`
  query {
    allPeoriaPlaces(sortBy: name_ASC, where: { OR: [{ firstFriday: true }] }) {
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

class FirstFriday extends Component {
  render() {
    return (
      <div>
        <Query query={ALL_PLACES_QUERY}>
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

export default FirstFriday;
