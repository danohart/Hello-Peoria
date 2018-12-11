import React from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
        return (
            <div className="search">
                {/* <div className="search-button"><FontAwesomeIcon icon={faSearch} /></div> */}
                <ApolloConsumer>
                    {client => <input type="search" id="search" name="search" placeholder='Try "Coffee Shop"' onChange={(e) => {
                     e.persist(); this.onChange(e, client);   
                    }} />}
                    
                </ApolloConsumer>
                <div className="search-wrapper">
                        {this.state.places.map(place => (
                            <div className="search-item">
                                <div className="image"><img src={place.image} /></div>
                                <div className="name">{place.name}<div className="description">{place.description}</div></div>
                            </div>
                            )
                        )}
                </div>
            </div>
        )
    }
}

export default AutoComplete;