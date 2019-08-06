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
    event {
      data
    }
  }
`;

class Events extends Component {
  render() {
    return (
      <>
      <Head>
        <title>Events happening in Peoria, IL // Hello Peoria</title>
        <meta name="description" content="What to do in Peoria today and this month. Events in Peoria, IL" />
      </Head>
      <Query query={ALL_EVENTS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Loading />;
          if (error) return <p>Error: {error.message}</p>;
          console.log(data);
          return (
            <div className="card-wrapper">
              {data.event.data.map(event => (
                <div className="card" key={event.id}>
                  <div className="date">
                    <h3>
                      <Moment format="MMMM, D - ha">{event.start_time}</Moment>
                    </h3>
                  </div>
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${event.cover.source})`,
                    }}
                  >
                    <Link href={`https://facebook.com/event/` + event.id}>
                      <a target="_blank" className="featured-link" />
                    </Link>

                    <div className="title-wrapper">
                      <div className="place-category">
                        <span>
                          <Link href={`https://facebook.com/event/` + event.id}>
                            <a>{event.place.name}</a>
                          </Link>
                        </span>
                      </div>
                      <div className="title">
                        <h2>{event.name}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="description">
                    {event.description.substring(0, 180)}...
                  </div>
                  <Link href={`https://facebook.com/event/` + event.id}>
                    <a className="button full-size">Learn More</a>
                  </Link>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
      </>
    );
  }
}

export default Events;
