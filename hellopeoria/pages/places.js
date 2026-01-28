import Link from "next/link";
import Meta from "../components/Meta";
import Place from "../components/Place";
import { getAllPlaces } from "../lib/data";

const PlacesPage = ({ places, setList }) => (
  <div>
    <Meta title='All Peoria Places' />
    <div className='page-header'>
      <h1>Places</h1>
    </div>
    <div className='card-wrapper'>
      {places.map((place) => (
        <Place place={place} key={place.id} setList={setList} />
      ))}
    </div>
  </div>
);

export async function getStaticProps() {
  const places = await getAllPlaces();

  return {
    props: {
      places,
    },
    revalidate: 3600,
  };
}

export default PlacesPage;
