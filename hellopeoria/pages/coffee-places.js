import Link from "next/link";
import CoffeePlaces from "../components/CoffeePlaces";

const coffeePlaces = props => (
  <div>
    <div className="page-header">
      <h1>Coffee</h1>
      {/* <Link href={{pathname: '/add-place',}}><a className="button">Add New Place</a></Link> */}
    </div>
    <CoffeePlaces page={parseFloat(props.query.page) || 1} />
  </div>
);

export default coffeePlaces;
