import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import Head from 'next/head';

const SINGLE_PLACE_QUERY = gql`
    query SINGLE_PLACE_QUERY($id: ID!) {
        place(where: { id: $id }) {
            id
            name
            address
            description
            category
            largeImage
        }
    }
`;

class SinglePlace extends Component {
    render() {
        return (
            <Query query={SINGLE_PLACE_QUERY} variables={{
                id: this.props.id,
            }}>
            {({error, loading, data}) => {
                if(error) return <Error error={error} />;
                if(loading) return <p>Loading...</p>;
                if(!data.place) return <p>No place found</p>;
                const place = data.place;
                return (
                    <div className="single-place-wrapper">
                        <Head>
                            <title>{place.name} // Hello Peoria</title>
                        </Head>
                        <div className="single-place">
                            <div className="image">
                                {place.largeImage && <img src={place.largeImage} alt={place.name} /> ? <img src={place.largeImage} alt={place.name} /> : <img src={'https://source.unsplash.com/600x200/?' + place.category} alt={place.name} />}
                            </div>
                            <h1>{place.name}</h1>
                            <p>{place.description}</p>
                            <div className="address">{place.address}</div>
                        </div>
                        <div className="map">
                            <iframe src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U&q=' + place.name + ' ' +place.address} width="600" height="450" frameborder="0" allowFullScreen></iframe>
                        </div>
                    </div>
                );
            }}
            </Query>
        );
    }
}

export default SinglePlace;