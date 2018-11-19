import Link from 'next/link';

const Places = props => (
    <div>
       <h1>Places</h1>
        <p>Hello!</p>
        <button><Link href={{pathname: '/add-place',}}>Add New Place</Link></button>
        <div className="card-wrapper">
            <div className="place card">
                <div className="image">
                    <img src="https://images.unsplash.com/photo-1524168272322-bf73616d9cb5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=161ce6b10a1b9518237d89cc7510a018&auto=format&fit=crop&w=1500&q=80" />
                </div>
                <div className="inner">
                    <h2>Chicago</h2>
                </div>
                <div className="footer">
                    <button>Info</button>
                    <button>Map</button>
                    <button>Add</button>
                </div>
            </div>

            <div className="place card">
                <div className="image">
                    <img src="https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4351b3f76cb0624b28407c3c98b3bd42&auto=format&fit=crop&w=1500&q=80" />
                </div>
                <div className="inner">
                    <h2>New York</h2>
                </div>
                <div className="footer">
                    <button>Info</button>
                    <button>Map</button>
                    <button>Add</button>
                </div>
            </div>
        </div>
    </div>
)

export default Places;