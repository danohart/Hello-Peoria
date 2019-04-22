import Nav from './Nav';
import Search from './Search';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';

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
