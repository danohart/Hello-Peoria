import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from './Place';

const ALL_PLACES_QUERY = gql`
    query ALL_PLACES_QUERY {
        places {
            id
            name
            description
            address
            image
        }
    }
`;

class Places extends Component {
    render() {
        return (
            <Query query={ALL_PLACES_QUERY}>
                {({ data, error, loading }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error: {error.message}</p>

                    return (
                        <div className="card-wrapper">
                            {data.places.map(place => <Place place={place}key={place.id}/>)}
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default Places;
export { ALL_PLACES_QUERY };