import React, { useState } from "react";
import Link from "next/link";

export default function Place({ place, setList }) {
  function placeBackground() {
    if (place.image) {
      return place.image;
    }
    // Use LoremFlickr with category keyword and place ID for consistency
    const category = place.mainCategory?.name || place.category || 'peoria';
    const keyword = getCategoryKeyword(category);
    const lockId = place.id?.slice(-6) || '1';
    return `https://loremflickr.com/400/200/${keyword}?lock=${lockId}`;
  }

  function getCategoryKeyword(category) {
    const keywords = {
      'Cafe': 'coffee,cafe',
      'Coffee': 'coffee,cafe',
      'Restaurant': 'restaurant,food',
      'Bar': 'bar,cocktail',
      'Breakfast': 'breakfast,brunch',
      'Mural': 'mural,street-art',
      'Attraction': 'attraction,landmark',
      'Shop': 'shop,store',
      'Entertainment': 'entertainment,theater',
    };
    return keywords[category] || 'restaurant,city';
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
        <Link href={`/place/${place.id}`}>
          <a className='featured-link' />
        </Link>
        <div className='title-wrapper'>
          <div className='place-category'>
            {place.mainCategory ? (
              <span>
                <Link href={`/category/${place.mainCategory.name}`}>
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
