import Link from "next/link";
import Meta from "../components/Meta";
import Places from "../components/Places";

const places = (props) => (
  <div>
    <Meta title='All Peoria Places' />
    <div className='page-header'>
      <h1>Places</h1>
      {/* <Link href={{pathname: '/add-place',}}><a className="button">Add New Place</a></Link> */}
    </div>
    <Places setList={props.setList} page={parseFloat(props.query.page) || 1} />
  </div>
);

export default places;
