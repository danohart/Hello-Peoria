import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Head from 'next/head';
import Error from './ErrorMessage';
import Loading from './Loading';
import Moment from 'react-moment';
import 'moment-timezone';

const ALL_EVENTS_QUERY = gql`
  query {
    event {
      data
    }
  }
`;

const metaTitle = 'Events happening in Peoria, IL // Hello Peoria';
const metaDescription =
  'What to do in Peoria today and this month. Events in Peoria, IL';

export default function Events() {
  const { loading, error, data } = useQuery(ALL_EVENTS_QUERY);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name='description' content={metaDescription} />
        <meta itemProp='description' content={metaDescription} />
        <meta
          itemProp='image'
          content='http://hellopeoria.co/static/images/logo.png'
        />

        {/*<!-- Facebook Meta Tags -->*/}
        <meta property='og:title' content={metaTitle} key='ogtitle' />
        <meta
          property='og:description'
          content={metaDescription}
          key='ogdescription'
        />
        <meta
          property='og:image'
          content='http://hellopeoria.co/static/images/events-peoria.png'
          key='ogimage'
        />
        <meta property='og:type' content='website' />

        {/*<!-- Twitter Meta Tags -->*/}
        <meta name='twitter:title' content={metaTitle} />
        <meta name='twitter:description' content={metaDescription} />
        <meta
          name='twitter:image'
          content='http://hellopeoria.co/static/images/events-peoria.png'
        />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <div className='card-wrapper'>
        {data.event.data.map((event) => (
          <div className='card' key={event.id}>
            <div className='date'>
              <h3>
                <Moment format='MMMM, D - ha'>{event.start_time}</Moment>
              </h3>
            </div>
            <div
              className='image'
              style={{
                backgroundImage: `url(${event.cover.source})`,
              }}
            >
              <Link href={`https://facebook.com/event/` + event.id}>
                <a target='_blank' className='featured-link' />
              </Link>

              <div className='title-wrapper'>
                <div className='place-category'>
                  <span>
                    <Link href={`https://facebook.com/event/` + event.id}>
                      <a>{event.place.name}</a>
                    </Link>
                  </span>
                </div>
                <div className='title'>
                  <h2>{event.name}</h2>
                </div>
              </div>
            </div>
            <div className='description'>
              {event.description.substring(0, 180)}...
            </div>
            <Link href={`https://facebook.com/event/` + event.id}>
              <a className='button full-size'>Learn More</a>
            </Link>
          </div>
        ))}
      </div>
      );
    </>
  );
}
