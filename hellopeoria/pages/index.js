import Link from "next/link";

const Home = props => (
  <div>
    <div className="card-wrapper">
      <div className="category card coffee">
        <Link href="/coffee-places">
          <a>
            <div className="inner">
              <h2>Coffee</h2>
              <p>Java to go, or stay</p>
            </div>
          </a>
        </Link>
      </div>

      <div className="category card restaurant">
        <Link href="/places">
          <a>
            <div className="inner">
              <h2>Restaurants</h2>
              <p>Grab a bite</p>
            </div>
          </a>
        </Link>
      </div>

      <div className="category card bar">
        <Link href="/bar-places">
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

    <div align="center">
      <Link href="/places">
        <button>More</button>
      </Link>
    </div>
  </div>
);

export default Home;
