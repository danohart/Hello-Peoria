import React from "react";
import Place from "../components/Place";
import Link from "next/link";
import Meta from "../components/Meta";
import { getFeaturedPlacesByPath } from "../lib/data";

export default function Home({ foodiePlaces, freePlaces, nightlifePlaces, setList }) {
  return (
    <div className='homepage'>
      <Meta />
      <div className='card-wrapper'>
        <div className='category card coffee'>
          <Link href='/category/Coffee'>
            <a>
              <div className='inner'>
                <h2>Coffee</h2>
                <p>Java to go, or stay</p>
              </div>
            </a>
          </Link>
        </div>

        <div className='category card restaurant'>
          <Link href='/category/Restaurant'>
            <a>
              <div className='inner'>
                <h2>Restaurants</h2>
                <p>Grab a bite</p>
              </div>
            </a>
          </Link>
        </div>

        <div className='category card bar'>
          <Link href='/category/Bar'>
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
          <Link href='/path/Free'>
            <a>Free</a>
          </Link>
        </div>
        <div className='path family'>
          <Link href='/path/Family'>
            <a>Family</a>
          </Link>
        </div>
        <div className='path nightlife'>
          <Link href='/path/Nightlife'>
            <a>Night Life</a>
          </Link>
        </div>
        <div className='path local'>
          <Link href='/path/Local'>
            <a>Local</a>
          </Link>
        </div>
        <div className='path foodie'>
          <Link href='/path/Foodie'>
            <a>Foodie</a>
          </Link>
        </div>
      </div>

      <h2 className='path-title'>Foodie</h2>
      <div className='card-wrapper home'>
        {foodiePlaces.map((place) => (
          <Place place={place} key={place.id} setList={setList} />
        ))}
        <button>
          <Link href='/path/Foodie'>
            <a>More</a>
          </Link>
        </button>
      </div>

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

      <>
        <h2 className='path-title'>Free</h2>
        <div className='card-wrapper home'>
          {freePlaces.map((place) => (
            <Place place={place} key={place.id} setList={setList} />
          ))}
          <button>
            <Link href='/path/Free'>
              <a>More</a>
            </Link>
          </button>
        </div>
      </>

      <>
        <h2 className='path-title'>Nightlife</h2>
        <div className='card-wrapper home'>
          {nightlifePlaces.map((place) => (
            <Place place={place} key={place.id} setList={setList} />
          ))}
          <button>
            <Link href='/path/Nightlife'>
              <a>More</a>
            </Link>
          </button>
        </div>
      </>
    </div>
  );
}

export async function getStaticProps() {
  const [foodiePlaces, freePlaces, nightlifePlaces] = await Promise.all([
    getFeaturedPlacesByPath('Foodie', 8),
    getFeaturedPlacesByPath('Free', 8),
    getFeaturedPlacesByPath('Nightlife', 8),
  ]);

  return {
    props: {
      foodiePlaces,
      freePlaces,
      nightlifePlaces,
    },
    revalidate: 3600, // Regenerate page every hour
  };
}
