import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer, gql } from '@apollo/client';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SEARCH_PLACES_QUERY = gql`
  query SEARCH_PLACES_QUERY($searchTerm: String!) {
    allPeoriaPlaces(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
          { tags_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      image
      name
      description
      mainCategory {
        name
      }
    }
  }
`;

function routeToPlace(place) {
  Router.push(`/place/${place.id}`);
}

class AutoComplete extends React.Component {
  state = {
    places: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_PLACES_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      places: res.data.allPeoriaPlaces,
      loading: false,
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <div className='search'>
        <Downshift
          onChange={routeToPlace}
          placeToString={(place) => (place === null ? '' : place.name)}
        >
          {({ getInputProps, isOpen, inputValue }) => (
            <div>
              <ApolloConsumer>
                {(client) => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Try "Coffee"',
                      name: 'search',
                      id: 'search',
                      className: this.state.loading ? 'Please wait...' : '',
                      onChange: (e) => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <div className='search-wrapper'>
                  <div>
                    {this.state.places.map((place, index) => {
                    const getCategoryKeyword = (cat) => {
                      const keywords = {
                        'Cafe': 'coffee,cafe', 'Coffee': 'coffee,cafe',
                        'Restaurant': 'restaurant,food', 'Bar': 'bar,cocktail',
                        'Breakfast': 'breakfast,brunch', 'Mural': 'mural,street-art',
                        'Attraction': 'attraction,landmark', 'Shop': 'shop,store',
                        'Entertainment': 'entertainment,theater',
                      };
                      return keywords[cat] || 'restaurant,city';
                    };
                    const keyword = getCategoryKeyword(place.mainCategory?.name);
                    const lockId = place.id?.slice(-6) || '1';
                    const fallbackImage = `https://loremflickr.com/600/200/${keyword}?lock=${lockId}`;

                    return (
                      <Link href={`/place/${place.id}`} key={place.id}>
                        <a>
                          <div className='search-item' key={place.id}>
                            <div className='image'>
                              <img
                                src={place.image || fallbackImage}
                                alt={place.name}
                              />
                            </div>
                            <div className='name'>
                              {place.name}
                              <div className='description'>
                                {place.description}
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    );
                    })}
                    {!this.state.places.length && !this.state.loading && (
                      <div className='search-item'>
                        Nothing Found for {inputValue}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </Downshift>
        <div className='search-button'>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    );
  }
}

export default AutoComplete;
