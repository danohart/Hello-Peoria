import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Place from '../components/Place';
import Link from 'next/link';
import Loading from '../components/Loading';

const HOME_PLACES_QUERY = gql`
  query($path: PathNameType, $itemNumber: Int = 8) {
    allPeoriaPlaces(
      first: $itemNumber
      sortBy: description_DESC
      where: { AND: [{ mainPath: { name: $path } }, { featured: true }] }
    ) {
      id
      name
      address {
        formattedAddress
      }
      altAddress
      image
      mainCategory {
        name
      }
      mainPath {
        name
      }
      path
      tags
    }
  }
`;

class Home extends Component {
  render() {
    return (
      <div className='homepage'>
        <div className='card-wrapper'>
          <div className='category card coffee'>
            <Link href='/category?category=Coffee'>
              <a>
                <div className='inner'>
                  <h2>Coffee</h2>
                  <p>Java to go, or stay</p>
                </div>
              </a>
            </Link>
          </div>

          <div className='category card restaurant'>
            <Link href='/category?category=Restaurant'>
              <a>
                <div className='inner'>
                  <h2>Restaurants</h2>
                  <p>Grab a bite</p>
                </div>
              </a>
            </Link>
          </div>

          <div className='category card bar'>
            <Link href='/category?category=Bar'>
              <a>
                <div className='inner'>
                  <h2>Bars</h2>
                  <p>Chill places for a drink</p>
                </div>
              </a>
            </Link>
          </div>

          <div className='category card breakfast'>
            <Link href='/breakfast-places'>
              <a>
                <div className='inner'>
                  <h2>Breakfast</h2>
                  <p>For the early riser</p>
                </div>
              </a>
            </Link>
          </div>
        </div>

        <h2 align='center'>Pick Your Path</h2>

        <div className='paths-wrapper'>
          <div className='path free'>
            <Link href='/path?paths=Free'>
              <a>Free</a>
            </Link>
          </div>
          <div className='path family'>
            <Link href='/path?paths=Family'>
              <a>Family</a>
            </Link>
          </div>
          {/* <div className="path sightseeing">
        <Link href="/path?paths=Sightseeing">
          <a>Sightseeing</a>
        </Link>
      </div> */}
          <div className='path nightlife'>
            <Link href='/path?paths=Nightlife'>
              <a>Night Life</a>
            </Link>
          </div>
          <div className='path local'>
            <Link href='/path?paths=Local'>
              <a>Local</a>
            </Link>
          </div>
          <div className='path foodie'>
            <Link href='/path?paths=Foodie'>
              <a>Foodie</a>
            </Link>
          </div>
          {/* <div className="path outdoor">
        <Link href="/path?paths=Outdoor">
          <a>Outdoor</a>
        </Link>
      </div> */}
          {/* <div className="path events">
        <Link href="/path?paths=Events">
          <a>Events</a>
        </Link>
      </div> */}
        </div>
        <Query query={HOME_PLACES_QUERY} variables={{ path: 'Foodie' }}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <>
                <h2 className='path-title'>Foodie</h2>
                <div className='card-wrapper home'>
                  {data.allPeoriaPlaces.map((place) => (
                    <Place place={place} key={place.id} />
                  ))}
                  <button>
                    <Link href='/path?paths=Foodie'>
                      <a>More</a>
                    </Link>
                  </button>
                </div>
              </>
            );
          }}
        </Query>
        <div className='advert'>
          <div className='ad-inner'>
            <h3>View All Places</h3>
            <div>See the full list of all the places to visit in Peoria.</div>
            <button>
              <Link href='/places'>
                <a>See All</a>
              </Link>
            </button>
          </div>
        </div>
        <Query query={HOME_PLACES_QUERY} variables={{ path: 'Free' }}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <>
                <h2 className='path-title'>Free</h2>
                <div className='card-wrapper home'>
                  {data.allPeoriaPlaces.map((place) => (
                    <Place place={place} key={place.id} />
                  ))}
                  <button>
                    <Link href='/path?paths=Free'>
                      <a>More</a>
                    </Link>
                  </button>
                </div>
              </>
            );
          }}
        </Query>
        <Query query={HOME_PLACES_QUERY} variables={{ path: 'Nightlife' }}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <>
                <h2 className='path-title'>Nightlife</h2>
                <div className='card-wrapper home'>
                  {data.allPeoriaPlaces.map((place) => (
                    <Place place={place} key={place.id} />
                  ))}
                  <button>
                    <Link href='/path?paths=Nightlife'>
                      <a>More</a>
                    </Link>
                  </button>
                </div>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Home;
