import Nav from './Nav';
import Search from './Search';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import Meta from './Meta';

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
    <Meta />
    <div className="logo">
      <Link href={{ pathname: '/' }}>
        <a>
          <img src={'../static/images/logo.png'} />
        </a>
      </Link>
    </div>
    <Search />
    <Nav />
  </header>
);

export default Header;
