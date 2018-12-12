import Link from 'next/link';

const Nav = () => (
    <div className="nav">
        <Link href={{pathname: '/places',}}>
            <a>Places</a>
        </Link>
    </div>
)

export default Nav;