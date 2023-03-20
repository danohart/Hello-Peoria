import React, { useState } from "react";
import Link from "next/link";

export default function Place({ place, setList }) {
  function placeBackground() {
    if (!place.image) {
      if (!place.mainCategory) {
        return place.category;
      }
      if (place.mainCategory.name === "Cafe") {
        return "/static/categories/coffee.jpg";
      }
      if (place.tags) {
        const tag = place.tags.split(", ");
        return (
          "https://source.unsplash.com/400x200/?" +
          tag[Math.floor(Math.random() * tag.length)]
            .replace(/\s+/g, ",")
            .toLowerCase()
        );
      } else {
        return (
          "https://source.unsplash.com/400x200/?" + place.mainCategory.name
        );
      }
    }

    return place.image;
  }

  const [isAdded, setIsAdded] = useState(false);

  function addPlaceToList(place) {
    setList(place);
    setIsAdded(!isAdded);
    return;
  }

  return (
    <div className='place card'>
      {!place.path ? null : (
        <div className={place.path.toLowerCase() + " path"} />
      )}
      <div
        className='image'
        style={{ backgroundImage: `url(${placeBackground()})` }}
      >
        <Link
          href={{
            pathname: "/place",
            query: { id: place.id },
          }}
        >
          <a className='featured-link' />
        </Link>
        <div className='title-wrapper'>
          <div className='place-category'>
            {place.mainCategory ? (
              <span>
                <Link
                  href={{
                    pathname: "/category",
                    query: { category: place.mainCategory.name },
                  }}
                >
                  <a>{place.mainCategory.name}</a>
                </Link>
              </span>
            ) : null}
          </div>

          <div className='title'>
            <h2>{place.name}</h2>
          </div>
        </div>
      </div>

      <div className='inner'>
        <p className='description'>
          {place.description}
          <br />
          <button
            // style={{ display: "none" }}
            onClick={() => addPlaceToList(place)}
          >
            Add To List
          </button>
        </p>

        <div className='addition-info'>
          <p className='address'>
            {place.address ? (
              <a
                target='_blank'
                href={
                  "https://maps.google.com/?q=" +
                  place.name +
                  " " +
                  place.address.formattedAddress
                }
              >
                {place.address.formattedAddress}
              </a>
            ) : place.altAddress ? (
              <a
                target='_blank'
                href={
                  "https://maps.google.com/?q=" +
                  place.name +
                  " " +
                  place.altAddress
                }
              >
                {place.altAddress}
              </a>
            ) : null}
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
    </div>
  );
}
