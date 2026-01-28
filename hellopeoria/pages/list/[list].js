import React, { useState } from "react";
import Place from "../../components/Place";
import Meta from "../../components/Meta";
import { getListByUrl, getAllListUrls } from "../../lib/data";

export default function List({ list, listData, setList }) {
  const [message, setMessage] = useState("Copy");

  if (!listData) {
    return <div>List not found</div>;
  }

  const currentUrl =
    process.env.NODE_ENV === "production"
      ? "https://hellopeoria.co/list/" + list
      : "https://localhost:7777/list/" + list;

  function copyUrl() {
    navigator.clipboard.writeText(currentUrl);
    setMessage("Copied!");
    setTimeout(() => {
      setMessage("Copy");
    }, 2000);
  }

  return (
    <>
      <Meta title='List created for places in Peoria' />
      <div className='share'>
        <input className='share-input' defaultValue={currentUrl} />
        <div className='share-click'>
          <div className='share-toast'>{message}</div>
          <button className='share-button' onClick={copyUrl}>
            Copy link
          </button>
        </div>
      </div>
      <div className='list'>
        <div className='card-wrapper'>
          {listData.places.map((place) => (
            <Place place={place} key={place.id} setList={setList} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const listUrls = await getAllListUrls();

  return {
    paths: listUrls.map((url) => ({
      params: { list: url },
    })),
    fallback: 'blocking', // Allow new lists to be created dynamically
  };
}

export async function getStaticProps({ params }) {
  const { list } = params;
  const listData = await getListByUrl(list);

  if (!listData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list,
      listData,
    },
    revalidate: 60, // Revalidate more frequently for user-created lists
  };
}
