import PathPlaces from '../components/Path';

const Path = props => (
  <div>
    <h1 className="page-header">{props.query.paths}</h1>
    <PathPlaces paths={props.query.paths} />
  </div>
);

export default Path;
