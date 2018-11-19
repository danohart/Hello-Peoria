import Link from 'next/link';
import Places from '../components/Places';

const places = props => (
    <div>
       <h1>Places</h1>
        <p>Hello!</p>
        <Link><a className="button" href={{pathname: '/add-place',}}>Add New Place</a></Link>
        <Places />
    </div>
)

export default places;