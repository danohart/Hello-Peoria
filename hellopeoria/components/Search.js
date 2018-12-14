import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import Link from 'next/link';

const SEARCH_PLACES_QUERY = gql`
    query SEARCH_PLACES_QUERY($searchTerm: String!) {
        places(where: {
            OR: [
                { name_contains: $searchTerm }
                { description_contains: $searchTerm }
            ]
        }) {
            id
            image
            name
            description
        }
    }
`;

function routeToPlace(place) {
    Router.push({
        pathname: '/place',
        query: {
            id: place.id,
        },
    });
}

class AutoComplete extends React.Component {
    state = {
        places: [],
        loading: false,
    }

    onChange = debounce(async (e, client) => {
        // turn loading on
        this.setState({ loading: true });
        // Manually query apollo client
        const res = await client.query({
            query: SEARCH_PLACES_QUERY,
            variables: { searchTerm: e.target.value },
        });
        this.setState({
            places: res.data.places,
            loading: false,  
        })
    }, 350);
    render() {
        resetIdCounter();
        return (
            <div className="search">
                <Downshift onChange={routeToPlace} placeToString={place => (place === null ? '' : place.name)}>
                    {({ getInputProps, isOpen, inputValue }) => (
                        <div>
                            <ApolloConsumer>
                                {client => <input 
                                {...getInputProps({
                                    type: 'search',
                                    placeholder: 'Try "Coffee"',
                                    name: 'search',
                                    id: 'search',
                                    className: this.state.loading ? 'Loading...' : '',
                                    onChange: e => {
                                        e.persist(); 
                                        this.onChange(e, client);   
                                    }
                                })} />}
                                
                            </ApolloConsumer>
                            {isOpen && (
                                <div className="search-wrapper">
                                    <div>
                                        {this.state.places.map((place, index) => (
                                            <Link href={{pathname: '/place', query: { id: place.id },}} key={place.id}><a>
                                                <div className="search-item"  key={place.id}>
                                                    <div className="image"><img src={place.image} /></div>
                                                    <div className="name">{place.name}<div className="description">{place.description}</div></div>
                                                </div>
                                            </a></Link>
                                        ))}
                                        {!this.state.places.length && !this.state.loading && (
                                            <div className="search-item">Nothing Found for {inputValue}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Downshift>
            </div>
        )
    }
}

export default AutoComplete;