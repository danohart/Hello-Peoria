import Nav from './Nav';
import Search from './Search';
import Link from 'next/link';
import Router from 'next/router';

const Header = () => (
    <header>
        <div className="logo">
            <Link href="/">
                <a><img src={'../static/images/logo.png'} /></a>
            </Link>
        </div>
        <Search />
        <Nav />
    </header>
)

export default Header;