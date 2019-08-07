import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Place from './Place';
import Loading from './Loading';
import Pagination from './Pagination';
import { perPage } from '../config';

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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* <div className="card-wrapper">
          {fsPlaces.map(place => (
            <div className="place card" key={place.id}>
              <div
                className="image"
                style={{
                  backgroundImage: `url(https://source.unsplash.com/400x200/?${place.categories[0].shortName.split(
                    ' '
                  )})`
                }}
              >
                <div className="title-wrapper">
                  <div className="place-category">
                    <span>
                      <Link href="#">
                        <a>{place.categories[0].shortName}</a>
                      </Link>
                    </span>
                  </div>
                  <div className="title">
                    <h2>{place.name}</h2>
                  </div>
                </div>
              </div>
              <div className="inner">
                <p className="description">{place.categories[0].name}</p>

                <div className="addition-info">
                  <p className="address">
                    {place.location.address}, Peoria, IL
                    <img
                      src={
                        place.categories[0].icon.prefix +
                        place.categories[0].icon.suffix
                      }
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div> */}
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
        <Pagination page={this.props.page} />
      </div>
    );
  }
}

export default Places;
export { ALL_PLACES_QUERY };
