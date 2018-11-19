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
                    {place.image && <img src={place.image} alt={place.title} />}
                    </div>
                    <div className="inner">
                        <h2>{place.title}</h2>
                        <p>{place.description}</p>
                        <p><strong>{place.address}</strong></p>
                    </div>
                    <div className="footer">
                        
                    </div>
                </div>
        );
    }
}

export default Place;