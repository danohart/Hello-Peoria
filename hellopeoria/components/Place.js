import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import User from './User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
      photo: [],
      userFavorite: false
    };
    this.handleFavoriting = this.handleFavoriting.bind(this);
  }

  handleFavoriting() {
    this.setState(state => ({
      userFavorite: !state.userFavorite
    }));
  }

  render() {
    const { place } = this.props;

    return (
      <div className="place card">
        {!place.paths ? null : (
          <div className={place.paths.toLowerCase() + ' path'} />
        )}
        <User>
          {({ data: { me } }) => (
            <>
              {me && (
                <div className="favorite">
                  <div className={this.state.userFavorite ? 'true' : 'false'}>
                    <a onClick={this.handleFavoriting}>
                      <FontAwesomeIcon icon={faStar} />
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </User>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Place;
