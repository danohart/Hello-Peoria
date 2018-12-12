import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeletePlace from './DeletePlace';

class Place extends Component {
    static propTypes = {
        place: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {
            photo: [],
        }
    }

    render() {
        const { place } = this.props;
        return (
                <div className="place card">
                    <div className="image">
                    <Link href={{pathname: '/place', query: { id: place.id },}}>
                        <a>{place.image && <img src={place.image} alt={place.name} /> ? <img src={place.image} alt={place.name} /> : <img src={'https://source.unsplash.com/400x200/?' + place.category} alt={place.name} />}</a>
                    </Link>
                    </div>
                    
                    <div className="inner">
                        <div className="place-category">
                            {place.category ? <span>{place.category}</span> : null}
                        </div>
                        <h2>
                            <Link href={{pathname: '/place', query: { id: place.id },}}>
                                <a>{place.name}</a>
                            </Link>
                        </h2>
                        <p className="description">{place.description}</p>
                        <p className="address">{place.address}</p>
                        <div className="options">
                            <a target='_blank' href={'https://maps.google.com/?q=' + place.name + ' ' + place.address}>Map</a>
                            <Link href={{pathname: '/place', query: { id: place.id },}}><a>Learn More</a></Link>
                        </div>
                        
                    </div>
                    {/* <div className="footer">
                        <button>✏️ Edit</button>
                        <DeletePlace id={place.id}>❌ Delete</DeletePlace>
                    </div> */}
                </div>
        );
    }
}

export default Place;