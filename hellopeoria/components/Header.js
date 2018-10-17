import Nav from './Nav';
import Link from 'next/link';
import Router from 'next/router';

const Header = () => (
    <header>
        <div className="logo">
            <Link href="/">
                <a><img src={'../static/images/logo.png'} /></a>
            </Link>
        </div>
        <Nav />
    </header>
)

export default Header;