import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import Head from 'next/head';
import User from './User';
import DeletePlace from './DeletePlace';
import Link from 'next/link';

const SINGLE_PLACE_QUERY = gql`
  query SINGLE_PLACE_QUERY($id: ID!) {
    place(where: { id: $id }) {
      id
      name
      address
      description
      category
      largeImage
      paths
    }
  }
`;

class SinglePlace extends Component {
  render() {
    return (
      <Query
        query={SINGLE_PLACE_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Please wait...</p>;
          if (!data.place) return <p>No place found</p>;
          const place = data.place;
          return (
            <div className="single-place-wrapper">
              <Head>
                <title>{place.name} // Hello Peoria</title>
                {/*<!-- Google / Search Engine Tags -->*/}
                <meta itemProp="name" content={place.name} />
                <meta itemProp="description" content={place.description} />
                <meta itemProp="image" content={place.largeImage} />

                {/*<!-- Facebook Meta Tags -->*/}
                <meta property="og:title" content={place.name} />
                <meta property="og:description" content={place.description} />
                <meta property="og:image" content={place.image} />
                <meta property="og:type" content="website" />

                {/*<!-- Twitter Meta Tags -->*/}
                <meta name="twitter:title" content={place.title} />
                <meta name="twitter:description" content={place.description} />
                <meta name="twitter:image" content={place.image} />
                <meta name="twitter:card" content="summary_large_image" />
              </Head>
              <div className="single-place">
                <div className="image">
                  {place.largeImage && (
                    <img src={place.largeImage} alt={place.name} />
                  ) ? (
                    <img src={place.largeImage} alt={place.name} />
                  ) : (
                    <img
                      src={
                        'https://source.unsplash.com/600x200/?' +
                        place.description
                      }
                      alt={place.name}
                    />
                  )}
                </div>
                <h1>{place.name}</h1>
                <p>{place.description}</p>
                <div className="address">{place.address}</div>
                <User>
                  {({ data: { me } }) => (
                    <div>
                      {me && (
                        <div className="footer">
                          <button>
                            <Link
                              href={{
                                pathname: 'update',
                                query: { id: place.id },
                              }}
                            >
                              <a>Edit ✏️</a>
                            </Link>
                          </button>
                          <DeletePlace id={place.id}>❌ Delete</DeletePlace>
                        </div>
                      )}
                    </div>
                  )}
                </User>
              </div>
              <div className="map">
                <iframe
                  src={
                    'https://www.google.com/maps/embed/v1/place?key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U&q=' +
                    place.name +
                    ' ' +
                    place.address
                  }
                  width="600"
                  height="450"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SinglePlace;
