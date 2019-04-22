import Link from 'next/link';
import Head from 'next/head';

const Home = props => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="stylesheet" type="text/css" href="static/nprogress.css" />
      <link rel="shortcut icon" href="/static/favicon.png" />
      <title>Hello Peoria // What to do in Peoria, IL right now</title>
      <meta
        name="description"
        content="Restaurants, Bars, and Events in Peoria. Find out cool things to see and do in Peoria, IL"
      />
    </Head>
    <div className="card-wrapper">
      <div className="category card coffee">
        <Link href="/category?category=Coffee">
          <a>
            <div className="inner">
              <h2>Coffee</h2>
              <p>Java to go, or stay</p>
            </div>
          </a>
        </Link>
      </div>

      <div className="category card restaurant">
        <Link href="/category?category=Restaurant">
          <a>
            <div className="inner">
              <h2>Restaurants</h2>
              <p>Grab a bite</p>
            </div>
          </a>
        </Link>
      </div>

      <div className="category card bar">
        <Link href="/category?category=Bar">
          <a>
            <div className="inner">
              <h2>Bars</h2>
              <p>Chill places for a drink</p>
            </div>
          </a>
        </Link>
      </div>

      <div className="category card breakfast">
        <Link href="/breakfast-places">
          <a>
            <div className="inner">
              <h2>Breakfast</h2>
              <p>For the early riser</p>
            </div>
          </a>
        </Link>
      </div>
    </div>

    <h2 align="center">Pick Your Path</h2>

    <div className="paths-wrapper">
      {/* <div className="path free">
        <Link href="/path?paths=Free">
          <a>Free</a>
        </Link>
      </div> */}
      <div className="path family">
        <Link href="/path?paths=Family">
          <a>Family</a>
        </Link>
      </div>
      {/* <div className="path sightseeing">
        <Link href="/path?paths=Sightseeing">
          <a>Sightseeing</a>
        </Link>
      </div> */}
      <div className="path nightlife">
        <Link href="/path?paths=Nightlife">
          <a>Night Life</a>
        </Link>
      </div>
      <div className="path local">
        <Link href="/path?paths=Local">
          <a>Local</a>
        </Link>
      </div>
      <div className="path foodie">
        <Link href="/path?paths=Foodie">
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
  </div>
);

export default Home;
