import Link from "next/link";
import BarPlaces from "../components/BarPlaces";

const barPlaces = props => (
  <div>
    <div className="page-header">
      <h1>Bars</h1>
      {/* <Link href={{pathname: '/add-place',}}><a className="button">Add New Place</a></Link> */}
    </div>
    <BarPlaces page={parseFloat(props.query.page) || 1} />
  </div>
);

export default barPlaces;
