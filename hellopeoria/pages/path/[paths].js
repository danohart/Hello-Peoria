import Head from "next/head";
import Place from "../../components/Place";
import { getPlacesByPath, getAllPaths } from "../../lib/data";

const PathPage = ({ pathName, places, setList }) => (
  <div>
    <Head>
      <title>{pathName} - Hello Peoria // Places in Peoria, IL</title>
      <meta name='description' content={pathName + " in Peoria, IL"} />
    </Head>
    <h1 className='page-header'>{pathName}</h1>
    <div className='card-wrapper'>
      {places.map((place) => (
        <Place place={place} key={place.id} setList={setList} />
      ))}
    </div>
  </div>
);

export async function getStaticPaths() {
  const paths = await getAllPaths();

  return {
    paths: paths.map((p) => ({
      params: { paths: p.name },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { paths: pathName } = params;
  const places = await getPlacesByPath(pathName);

  return {
    props: {
      pathName,
      places,
    },
    revalidate: 3600,
  };
}

export default PathPage;
