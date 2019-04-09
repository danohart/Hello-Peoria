import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import DeletePlace from "./DeletePlace";
import User from "./User";

class Place extends Component {
  static propTypes = {
    place: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      photo: []
    };
  }

  render() {
    const { place } = this.props;
    const placeBackground = place.image
      ? place.image
      : "https://source.unsplash.com/400x200/?" + place.category;

    return (
      <div className="place card">
        <Link href={{ pathname: "/place", query: { id: place.id } }}>
          <a>
            <div
              className="image"
              style={{ backgroundImage: `url(${placeBackground})` }}
            >
              <div className="title-wrapper">
                <div className="place-category">
                  {place.category ? <span>{place.category}</span> : null}
                </div>

                <div className="title">
                  <h2>{place.name}</h2>
                </div>
              </div>
            </div>
          </a>
        </Link>

        <div className="inner">
          <p className="description">{place.description}</p>

          {/* <div className="addition-info">
            <p className="address">{place.address}</p>
            <div className="options">
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
                      href={{ pathname: "update", query: { id: place.id } }}
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
