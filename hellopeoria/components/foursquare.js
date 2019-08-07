import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Head from 'next/head';
import Loading from './Loading';
import Moment from 'react-moment';
import 'moment-timezone';

const ALL_EVENTS_QUERY = gql`
  query {
    fsqPlace {
      data
    }
  }
`;

const metaTitle = 'Events happening in Peoria, IL // Hello Peoria';
const metaDescription =
  'What to do in Peoria today and this month. Events in Peoria, IL';

class Foursquare extends Component {
  render() {
    return (
      <>
        <Head>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta itemProp="description" content={metaDescription} />
          <meta
            itemProp="image"
            content="http://hellopeoria.co/static/images/logo.png"
          />

          {/*<!-- Facebook Meta Tags -->*/}
          <meta property="og:title" content={metaTitle} key="ogtitle" />
          <meta
            property="og:description"
            content={metaDescription}
            key="ogdescription"
          />
          <meta
            property="og:image"
            content="http://hellopeoria.co/static/images/events-peoria.png"
            key="ogimage"
          />
          <meta property="og:type" content="website" />

          {/*<!-- Twitter Meta Tags -->*/}
          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:description" content={metaDescription} />
          <meta
            name="twitter:image"
            content="http://hellopeoria.co/static/images/events-peoria.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Query query={ALL_EVENTS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <p>Error: {error.message}</p>;
            console.log('Foursquare', data);
            return (
              <div className="card-wrapper">
                {/* {data.fsqInfo.response.venues.map(event => (
                  <div className="card" key={event.id}>
                    <h2>{event.name}</h2>
                  </div>
                ))} */}
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Foursquare;
