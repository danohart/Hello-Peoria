import Nav from './Nav';
import Search from './Search';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <header>
    <div className='logo'>
      <Link href={{ pathname: '/' }}>
        <a>
          <img src={'/images/logo.png'} />
        </a>
      </Link>
    </div>
    <Search />
    <Nav />
  </header>
);

export default Header;
