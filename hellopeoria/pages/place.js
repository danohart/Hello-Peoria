import SinglePlace from '../components/SinglePlace';

const Place = props => (
    <div>
        <SinglePlace id={props.query.id} />
    </div>
)

export default Place;