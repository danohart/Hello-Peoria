import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Place from './Place';
import Error from './ErrorMessage';
import Loading from './Loading';

const ALL_PLACES_QUERY = gql`
  query {
    allPeoriaPlaces(
      sortBy: name_ASC
      where: {
        OR: [
          { description_contains: "breakfast" }
          { tags_contains: "breakfast" }
        ]
      }
    ) {
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

export default function BreakfastPlaces() {
  const { loading, error, data } = useQuery(ALL_PLACES_QUERY);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className='card-wrapper'>
      {data.allPeoriaPlaces.map((place) => (
        <Place place={place} key={place.id} />
      ))}
    </div>
  );
}
