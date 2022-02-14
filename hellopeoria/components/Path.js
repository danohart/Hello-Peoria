import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Place from './Place';
import Error from './ErrorMessage';
import Loading from './Loading';

const PATH_PLACES_QUERY = gql`
  query($path: PathNameType!) {
    allPeoriaPlaces(
      sortBy: name_ASC
      where: { AND: [{ mainPath: { name: $path } }] }
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

export default function PathPlaces(props) {
  const { loading, error, data } = useQuery(PATH_PLACES_QUERY, {
    variables: { path: props.paths },
  });

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
