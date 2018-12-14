import Link from 'next/link';

const Home = props => (
    <div>
        <div className="card-wrapper">
            <div className="category card coffee">
            <Link href='/places'><a>
                <div className="inner">
                    <h2>Coffee</h2>
                    <p>Java to go, or stay</p>
                </div>
            </a></Link>
            </div>

            <div className="category card restaurant">
            <Link href='/places'><a>
                <div className="inner">
                    <h2>Restaurants</h2>
                    <p>Grab a bite</p>
                </div>
            </a></Link>
            </div>

            <div className="category card event">
            <Link href='/places'><a>
                <div className="inner">
                    <h2>Events</h2>
                    <p>Things to do around town</p>
                </div>
            </a></Link>
            </div>

            <div className="category card breakfast">
            <Link href='/places'><a>
                <div className="inner">
                    <h2>Breakfast</h2>
                    <p>For the early riser</p>
                </div>
            </a></Link>
            </div>
        </div>
       	
        <div align="center"><Link href="/places"><button>More</button></Link></div>
    </div>
)

export default Home;