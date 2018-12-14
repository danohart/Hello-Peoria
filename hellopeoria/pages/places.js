import Link from 'next/link';
import Places from '../components/Places';

const places = props => (
    <div>
        <div className="page-header">
            <h1>Places</h1>
            {/* <Link href={{pathname: '/add-place',}}><a className="button">Add New Place</a></Link> */}
        </div>
        <Places page={parseFloat(props.query.page) || 1} />
    </div>
)

export default places;