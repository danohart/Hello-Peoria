import UpdatePlace from '../components/UpdatePlace';

const Update = props => (
    <div>
        <UpdatePlace id={props.query.id} />
    </div>
)

export default Update;