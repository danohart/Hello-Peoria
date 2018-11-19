import Link from 'next/link';
import Places from '../components/Places';

const places = props => (
    <div>
       <h1>Places</h1>
        <Link href={{pathname: '/add-place',}}><a className="button">Add New Place</a></Link>
        <Places />
    </div>
)

export default places;