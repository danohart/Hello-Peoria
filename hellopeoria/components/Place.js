import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class Place extends Component {
    static propTypes = {
        place: PropTypes.object.isRequired,
    };

    render() {
        const { place } = this.props;
        return (
            
                <div className="place card">
                    <div className="image">
                        {place.image && <img src={place.image} alt={place.title} /> ? <img src={place.image} alt={place.title} /> : <img src='https://via.placeholder.com/350x150?text=Image' alt={place.title} />}
                    </div>
                    <div className="inner">
                        <h2>{place.name}</h2>
                        <p className="description">{place.description}</p>
                        <p className="address">{place.address}</p>
                    </div>
                    <div className="footer">
                        
                    </div>
                </div>
        );
    }
}

export default Place;