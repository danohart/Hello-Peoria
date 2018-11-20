import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_PLACES_QUERY } from './Places';

const DELETE_PLACE_MUTATION = gql`
    mutation DELETE_PLACE_MUTATION($id: ID!) {
        deletePlace(id: $id) {
            id
        }
    }
`;

class DeletePlace extends Component {
    update = (cache, payload) => {
        // manually update the cache on the client, so it matches the server
        // 1. Read the cache for the places we want
        const data = cache.readQuery({ 
            query: ALL_PLACES_QUERY 
        });
        console.log(data, payload);
        // 2. Filter the deleted place out of the page
        data.places = data.places.filter(place => place.id !== payload.data.deletePlace.id);
        // 3. Put the places back!
        cache.writeQuery({ 
            query: ALL_PLACES_QUERY, 
            data
        });
    };
    render() {
        return (
            <Mutation
                mutation={DELETE_PLACE_MUTATION}
                variables={{ id: this.props.id }}
                update={this.update}
            >
                {(deletePlace, { error }) => (
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this ?')) {
                                deletePlace();
                            }
                        }}
                    >
                        {this.props.children}
                    </button>
                )}
            </Mutation>
        );
    }
}

export default DeletePlace;