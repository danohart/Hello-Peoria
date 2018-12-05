import Link from 'next/link';
import Places from '../components/Places';

const places = props => (
    <div>
       <h1>Places</h1>
        <Link href={{pathname: '/add-place',}}><a className="button">Add New Place</a></Link>
        <Places page={parseFloat(props.query.page) || 1} />
    </div>
)

export default places;