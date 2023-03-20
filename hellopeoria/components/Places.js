import React from "react";
import { useQuery, gql } from "@apollo/client";
import Place from "./Place";
import Error from "./ErrorMessage";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { perPage } from "../config";

const ALL_PLACES_QUERY = gql`
  query {
    allPeoriaPlaces(sortBy: name_ASC) {
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
      tags
    }
  }
`;

export default function Places(props) {
  const { loading, error, data } = useQuery(ALL_PLACES_QUERY);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className='card-wrapper'>
      {data.allPeoriaPlaces.map((place) => (
        <Place place={place} key={place.id} setList={props.setList} />
      ))}
    </div>
  );
}
