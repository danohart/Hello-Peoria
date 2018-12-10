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

    // componentDidMount() {
    //     fetch ('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Broken%20Tree&inputtype=textquery&fields=photos&key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U', {mode: 'cors'})
    //     .then(results => {
    //         return results.json();
    //     }).then(data => {
    //         let photo = data.results.map((pic) => {
    //             return (
    //                 <div key={pic.results}>
    //                     <img src={candidates.place_id} />
    //                 </div>
    //             )
    //         })
    //         this.setState({photo: photo});
    //         console.log('photo id', this.state.photo);
    //     })
    // }

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
                        <h2>
                            <Link href={{pathname: '/place', query: { id: place.id },}}>
                                <a>{place.name}</a>
                            </Link>
                        </h2>
                        {/* <div><img src={''} /></div> */}
                        <p className="description">{place.description}</p>
                        <p className="address">{place.address}</p>
                        <div className="place-category">
                            {place.category ? <span>{place.category}</span> : null}
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