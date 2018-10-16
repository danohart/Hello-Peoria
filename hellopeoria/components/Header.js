import Nav from './Nav';
import Link from 'next/link';
import Router from 'next/router';

const Header = () => (
    <header>
        <div className="bar">
            <div className="logo">
                <Link href="/">
                    <a>Hello Peoria</a>
                </Link>
            </div>
        </div>
        <Nav />
    </header>
)

export default Header;