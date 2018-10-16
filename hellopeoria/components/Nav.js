import Link from 'next/link';

const Nav = () => (
    <div>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href='/places'>
            <a>Places</a>
        </Link>
    </div>
)

export default Nav;