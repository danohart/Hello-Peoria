import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../components/Loading';
import Error from '../components/ErrorMessage';
import Head from 'next/head';

const SINGLE_PLACE_QUERY = gql`
  query SINGLE_PLACE_QUERY($id: ID!) {
    PeoriaPlace(where: { id: $id }) {
      id
      name
      address {
        formattedAddress
      }
      image
      altAddress
      description
      mainCategory {
        name
      }
      mainPath {
        name
      }
    }
  }
`;

class SinglePlace extends Component {
  render() {
    return (
      <Query
        query={SINGLE_PLACE_QUERY}
        variables={{
          id: this.props.query.id,
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <Loading />;
          if (!data.PeoriaPlace) return <p>No place found</p>;
          const place = data.PeoriaPlace;

          function determineImage() {
            if (!place.mainCategory)
              return 'https://source.unsplash.com/600x200/?' + place.category;
            if (place.mainCategory)
              return (
                'https://source.unsplash.com/600x200/?' +
                place.mainCategory.name
              );
            return place.image;
          }

          function determineAddress() {
            if (place.address && place.address.formattedAddress)
              return place.address.formattedAddress;
            if (!place.address) return place.altAddress;
          }
          return (
            <div className='single-place-wrapper'>
              <Head>
                <title>{place.name} // Hello Peoria</title>
                <meta name='description' content={place.description} />
                {/*<!-- Google / Search Engine Tags -->*/}
                <meta itemProp='name' content={place.name} />
                <meta itemProp='description' content={place.description} />
                <meta itemProp='image' content={determineImage()} />

                {/*<!-- Facebook Meta Tags -->*/}
                <meta property='og:title' content={place.name} key='ogtitle' />
                <meta
                  property='og:description'
                  content={place.description}
                  key='ogdescription'
                />
                <meta
                  property='og:image'
                  content={
                    place.largeImage && place.largeImage
                      ? place.largeImage
                      : 'https://source.unsplash.com/600x200/?' + place.category
                  }
                  key='ogimage'
                />

                <meta property='og:type' content='website' />

                {/*<!-- Twitter Meta Tags -->*/}
                <meta name='twitter:title' content={place.title} />
                <meta name='twitter:description' content={place.description} />
                <meta
                  name='twitter:image'
                  content={
                    place.largeImage && place.largeImage
                      ? place.largeImage
                      : 'https://source.unsplash.com/600x200/?' + place.category
                  }
                />
                <meta name='twitter:card' content='summary_large_image' />
              </Head>
              <div className='single-place'>
                <div className='image'>
                  {place.image && <img src={place.image} alt={place.name} /> ? (
                    <img src={place.image} alt={place.name} />
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
                <div className='address'>{determineAddress()}</div>
              </div>
              <div className='map'>
                {place.category === 'Mural' ? (
                  <iframe
                    src={
                      'https://www.google.com/maps/embed/v1/place?key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U&q=' +
                      place.address
                        ? place.address.formattedAddress
                        : place.altAddress
                        ? place.altAddress
                        : null + 'Peoria, IL'
                    }
                    width='600'
                    height='450'
                    frameBorder='0'
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    src={
                      'https://www.google.com/maps/embed/v1/place?key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U&q=' +
                      place.name +
                      ' ' +
                      determineAddress()
                    }
                    width='600'
                    height='450'
                    frameBorder='0'
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SinglePlace;
