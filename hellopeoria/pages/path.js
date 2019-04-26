import PathPlaces from '../components/Path';
import Head from 'next/head';

const Path = props => (
  <div>
    <Head>
      <title>{props.query.paths} - Hello Peoria // Places in Peoria, IL</title>
      <meta name="description" content={props.query.paths + 'in Peoria, IL'} />
    </Head>
    <h1 className="page-header">{props.query.paths}</h1>
    <PathPlaces paths={props.query.paths} />
  </div>
);

export default Path;
