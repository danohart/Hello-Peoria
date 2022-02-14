import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Place from './Place';
import Error from './ErrorMessage';
import Loading from './Loading';

const CATEGORY_PLACES_QUERY = gql`
  query($category: String!) {
    allPeoriaPlaces(
      sortBy: name_ASC
      where: { mainCategory: { name: $category } }
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

export default function CategoryPlaces(props) {
  const { loading, error, data } = useQuery(CATEGORY_PLACES_QUERY, {
    variables: {
      category: props.category === 'Coffee' ? 'Cafe' : props.category,
    },
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
