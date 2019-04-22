import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import DeletePlace from './DeletePlace';
import User from './User';

class Place extends Component {
  static propTypes = {
    place: PropTypes.object.isRequired
  };

  placeBackground({ place } = this.props) {
    if (!place.image) {
      if (place.category === 'Coffee') {
        return '/static/categories/coffee.jpg';
      }
      return 'https://source.unsplash.com/400x200/?' + place.category;
    }
    return place.image;
  }

  constructor() {
    super();
    this.state = {
      photo: []
    };
  }

  render() {
    const { place } = this.props;

    return (
      <div className="place card">
        {!place.paths ? null : (
          <div className={place.paths.toLowerCase() + ' path'} />
        )}
        <div
          className="image"
          style={{ backgroundImage: `url(${this.placeBackground()})` }}
        >
          <Link
            href={{
              pathname: '/place',
              query: { id: place.id }
            }}
          >
            <a className="featured-link" />
          </Link>
          <div className="title-wrapper">
            <div className="place-category">
              {place.category ? (
                <span>
                  <Link
                    href={{
                      pathname: '/category',
                      query: { category: place.category }
                    }}
                  >
                    <a>{place.category}</a>
                  </Link>
                </span>
              ) : null}
            </div>

            <div className="title">
              <h2>{place.name}</h2>
            </div>
          </div>
        </div>

        <div className="inner">
          <p className="description">{place.description}</p>

          <div className="addition-info">
            <p className="address">
              <a
                target="_blank"
                href={
                  'https://maps.google.com/?q=' +
                  place.name +
                  ' ' +
                  place.address
                }
              >
                {place.address}
              </a>
            </p>
            {/* <div className="options">
              <a
                target="_blank"
                href={
                  "https://maps.google.com/?q=" +
                  place.name +
                  " " +
                  place.address
                }
              >
                Map
              </a>
              <Link href={{ pathname: "/place", query: { id: place.id } }}>
                <a>More</a>
              </Link>
              <a className="isDisabled" title="Coming Soon">
                Add +
              </a>
            </div> */}
          </div>
        </div>
        <User>
          {({ data: { me } }) => (
            <>
              {me && (
                <div className="footer">
                  <button>
                    <Link
                      href={{ pathname: 'update', query: { id: place.id } }}
                    >
                      <a>Edit ✏️</a>
                    </Link>
                  </button>
                  <DeletePlace id={place.id}>❌ Delete</DeletePlace>
                </div>
              )}
            </>
          )}
        </User>
      </div>
    );
  }
}

export default Place;
