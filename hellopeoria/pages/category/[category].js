import Head from "next/head";
import Place from "../../components/Place";
import { getPlacesByCategory, getAllCategories } from "../../lib/data";

const CategoryPage = ({ category, places, setList }) => (
  <div>
    <Head>
      <title>
        {category}s - Hello Peoria // What to do in Peoria, IL right now
      </title>
      <meta name='description' content={category + " in Peoria, IL"} />
    </Head>
    <h1 className='page-header'>{category}s</h1>
    <div className='card-wrapper'>
      {places.map((place) => (
        <Place place={place} key={place.id} setList={setList} />
      ))}
    </div>
  </div>
);

export async function getStaticPaths() {
  const categories = await getAllCategories();

  const paths = categories.map((cat) => ({
    params: { category: cat.name },
  }));

  // Add "Coffee" as an alias for "Cafe"
  paths.push({ params: { category: 'Coffee' } });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { category } = params;

  // Map "Coffee" to "Cafe" for database lookup
  const dbCategory = category === 'Coffee' ? 'Cafe' : category;
  const places = await getPlacesByCategory(dbCategory);

  return {
    props: {
      category,
      places,
    },
    revalidate: 3600,
  };
}

export default CategoryPage;
