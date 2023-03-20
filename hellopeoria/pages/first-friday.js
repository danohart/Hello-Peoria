import React from "react";
import { useQuery, gql } from "@apollo/client";
import Place from "../components/Place";
import Error from "../components/ErrorMessage";
import Head from "next/head";
import Loading from "../components/Loading";
import { perPage } from "../config";

const ALL_PLACES_QUERY = gql`
  query {
    allPeoriaPlaces(sortBy: name_ASC, where: { OR: [{ firstFriday: true }] }) {
      id
      name
      description
      address {
        formattedAddress
      }
      altAddress
      image
      mainCategory {
        name
      }
      mainPath {
        name
      }
    }
  }
`;

export default function FirstFriday(props) {
  const { loading, error, data } = useQuery(ALL_PLACES_QUERY);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      <Head>
        <title>
          Peoria's First Friday | Art Gallery Openings // Hello Peoria
        </title>
        <meta
          name='description'
          content="What's Happening in Peoria on First Fridays. First Friday is a national movement among artists in many cities across the United States."
        />
        <meta
          itemProp='image'
          content='http://hellopeoria.co/static/images/logo.png'
        />
      </Head>
      <h1>Peoria First Fridays</h1>
      <div className='advert alt'>
        <div className='ad-inner'>
          <p>
            First Friday is a national movement among artists in many cities
            across the United States. Artists open their studios to present
            their work to the public.
          </p>

          <p>
            First Friday events keep the arts in the forefront of a community.
          </p>
        </div>
      </div>

      <div className='card-wrapper'>
        {data.allPeoriaPlaces.map((place) => (
          <Place place={place} key={place.id} setList={props.setList} />
        ))}
      </div>
    </>
  );
}
