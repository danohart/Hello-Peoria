import React, { useState } from "react";
import Place from "../../components/Place";
import Loading from "../../components/Loading";
import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import Meta from "../../components/Meta";

export default function List(props) {
  const { list } = props.query;

  const GET_LIST = gql`
    query GET_LIST($list: String!) {
      allPeoriaFavoriteLists(where: { url: $list }) {
        url
        places {
          id
          name
          description
          address {
            lat
            lng
            formattedAddress
          }

          image
          mainCategory {
            name
          }
        }
        postedAt
      }
    }
  `;

  const [message, setMessage] = useState("Copy");

  const { data, loading, error } = useQuery(GET_LIST, {
    variables: { list },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :( {error}</p>;

  const currentUrl =
    process.env.NODE_ENV === "production"
      ? "https://hellopeoria.co/list/" + list
      : "https://localhost:7777/list/" + list;

  function copyUrl() {
    navigator.clipboard.writeText(currentUrl);
    setMessage("Copied!");
    setTimeout(() => {
      setMessage("Copy");
    }, "2000");
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
          {data.allPeoriaFavoriteLists[0].places.map((place) => (
            <Place place={place} key={place.id} setList={props.setList} />
          ))}
        </div>
      </div>
    </>
  );
}
