import Head from "next/head";
import Place from "../components/Place";
import { searchPlaces } from "../lib/data";

const BreakfastPlacesPage = ({ places, setList }) => (
  <div>
    <Head>
      <title>Breakfast Places - Hello Peoria // Places in Peoria, IL</title>
      <meta name='description' content='Breakfast places in Peoria, IL' />
    </Head>
    <div className='page-header'>
      <h1>Breakfast</h1>
    </div>
    <div className='card-wrapper'>
      {places.map((place) => (
        <Place place={place} key={place.id} setList={setList} />
      ))}
    </div>
  </div>
);

export async function getStaticProps() {
  const places = await searchPlaces('breakfast');

  return {
    props: {
      places,
    },
    revalidate: 3600,
  };
}

export default BreakfastPlacesPage;
