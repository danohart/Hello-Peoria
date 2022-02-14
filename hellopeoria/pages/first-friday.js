import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Place from '../components/Place';
import Error from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { perPage } from '../config';

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

export default function FirstFriday() {
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
