import SinglePlace from '../components/SinglePlace';
import Head from 'next/head';

const Place = props => (
  <div>
    <SinglePlace id={props.query.id} />
  </div>
);

export default Place;
