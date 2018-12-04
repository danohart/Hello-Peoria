import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeletePlace from './DeletePlace';

class Place extends Component {
    static propTypes = {
        place: PropTypes.object.isRequired,
    };

    render() {
        const { place } = this.props;
        console.log('category', place.category);
        return (
                <div className="place card">
                    <div className="image">
                    <Link href={{pathname: '/place', query: { id: place.id },}}>
                        {place.image && <img src={place.image} alt={place.name} /> ? <img src={place.image} alt={place.name} /> : <img src={'https://source.unsplash.com/400x200/?' + place.category} alt={place.name} />}
                    </Link>
                    </div>
                    <div className="inner">
                        <h2>
                            <Link href={{pathname: '/place', query: { id: place.id },}}>
                                {place.name}
                            </Link>
                        </h2>

                        <p className="description">{place.description}</p>
                        <p className="address">{place.address}</p>
                        <div className="place-category">
                            <span>{place.category}</span>
                        </div>
                        <a target='_blank' href={'https://maps.google.com/?q=' + place.name + ' ' + place.address}>Map</a>
                    </div>
                    <div className="footer">
                        <button>✏️ Edit</button>
                        <DeletePlace id={place.id}>❌ Delete</DeletePlace>
                    </div>
                </div>
        );
    }
}

export default Place;