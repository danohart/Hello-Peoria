import Link from 'next/link';
import Places from '../components/Places';

const places = props => (
    <div>
       <h1>Places</h1>
        <p>Hello!</p>
        <button><Link href={{pathname: '/add-place',}}>Add New Place</Link></button>
        <Places />
    </div>
)

export default places;