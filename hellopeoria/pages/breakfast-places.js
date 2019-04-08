import Link from "next/link";
import BreakfastPlaces from "../components/BreakfastPlaces";

const coffeePlaces = props => (
  <div>
    <div className="page-header">
      <h1>Breakfast</h1>
      {/* <Link href={{pathname: '/add-place',}}><a className="button">Add New Place</a></Link> */}
    </div>
    <BreakfastPlaces page={parseFloat(props.query.page) || 1} />
  </div>
);

export default coffeePlaces;
