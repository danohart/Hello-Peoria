import CategoryPlaces from '../components/Category';
import Head from 'next/head';

const Category = props => (
  <div>
    <Head>
      <title>
        {props.query.category} - Hello Peoria // What to do in Peoria, IL right
        now
      </title>
      <meta
        name="description"
        content={props.query.category + 'in Peoria, IL'}
      />
    </Head>
    <h1 className="page-header">{props.query.category}s</h1>
    <CategoryPlaces category={props.query.category} />
  </div>
);

export default Category;
