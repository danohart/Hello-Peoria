import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from './Place';
import Loading from './Loading';

const CATEGORY_PLACES_QUERY = gql`
  query($category: String!) {
    allPeoriaPlaces(
      sortBy: name_ASC
      where: { mainCategory: { name: $category } }
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
      path
    }
  }
`;

class CategoryPlaces extends Component {
  render() {
    return (
      <div>
        <Query
          query={CATEGORY_PLACES_QUERY}
          variables={{
            category:
              this.props.category === 'Coffee' ? 'Cafe' : this.props.category,
          }}
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
      </div>
    );
  }
}

export default CategoryPlaces;
export { CATEGORY_PLACES_QUERY };
