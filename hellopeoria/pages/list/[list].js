import React, { useState } from "react";
import Place from "../../components/Place";
import Meta from "../../components/Meta";
import { getPlacesByIds } from "../../lib/data";

export default function List({ list, places, setList }) {
  const [message, setMessage] = useState("Copy");

  if (!places || places.length === 0) {
    return <div>No places found in this list</div>;
  }

  const currentUrl =
    process.env.NODE_ENV === "production"
      ? "https://hellopeoria.co/list/" + list
      : "http://localhost:7777/list/" + list;

  function copyUrl() {
    navigator.clipboard.writeText(currentUrl);
    setMessage("Copied!");
    setTimeout(() => {
      setMessage("Copy");
    }, 2000);
  }

  return (
    <>
      <Meta title='My Peoria Places List' />
      <div className='share'>
        <input className='share-input' defaultValue={currentUrl} readOnly />
        <div className='share-click'>
          <div className='share-toast'>{message}</div>
          <button className='share-button' onClick={copyUrl}>
            Copy link
          </button>
        </div>
      </div>
      <div className='list'>
        <div className='card-wrapper'>
          {places.map((place) => (
            <Place place={place} key={place.id} setList={setList} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // No pre-generated paths - all lists are created dynamically from URL
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { list } = params;

  // Parse place IDs from the URL (comma-separated)
  const placeIds = list.split(',').filter(id => id.trim());

  if (placeIds.length === 0) {
    return {
      notFound: true,
    };
  }

  const places = await getPlacesByIds(placeIds);

  if (places.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
      places,
    },
    revalidate: 3600,
  };
}
