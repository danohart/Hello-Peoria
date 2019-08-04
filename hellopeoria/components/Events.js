import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Loading from './Loading';
import Moment from 'react-moment';
import 'moment-timezone';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      isLoading: true,
    };
  }

  fetchFBEvents() {
    fetch(
      `https://graph.facebook.com/v4.0/1353765521380739/events?fields=cover,name,place,description,start_time&access_token=` +
        FB_API
    )
      .then(function(response) {
        return response.json();
      })
      .then(eventData => {
        this.setState({
          events: eventData.data,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log('ERROR: ' + err);
      });
  }

  componentDidMount() {
    this.fetchFBEvents();
  }
  render() {
    const { events } = this.state;
    console.log('FBEvents', events);
    return (
      <div className="card-wrapper">
        <Head>
          <title>Events in Peoria, IL // Hello Peoria</title>
        </Head>
        {this.state.isLoading === true ? <Loading /> : ''}
        {this.state.events.map(event => (
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
          </div>
        ))}
      </div>
    );
  }
}

export default Events;
