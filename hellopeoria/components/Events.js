import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Loading from './Loading';
import Moment from 'react-moment';
import 'moment-timezone';

class Events extends Component {
  render() {
    return (
      <div className="card-wrapper">
        <Head>
          <title>Events in Peoria, IL // Hello Peoria</title>
        </Head>
        {/* {this.state.events.map(event => (
          <div className="card" key={event.id}>
            <div className="date">
              <h3>
                <Moment format="MMMM, D - ha">{event.start_time}</Moment>
              </h3>
            </div>
            <div
              className="image"
              style={{ backgroundImage: `url(${event.cover.source})` }}
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
        ))} */}
      </div>
    );
  }
}

export default Events;
