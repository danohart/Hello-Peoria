import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from './Place';

const CATEGORY_PLACES_QUERY = gql`
  query($category: String!) {
    places(orderBy: name_ASC, where: { category: $category }) {
      id
      name
      description
      address
      image
      category
    }
  }
`;

class CategoryPlaces extends Component {
  render() {
    return (
      <div>
        <Query
          query={CATEGORY_PLACES_QUERY}
          variables={{ category: this.props.category }}
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
      </div>
    );
  }
}

export default CategoryPlaces;
export { CATEGORY_PLACES_QUERY };
