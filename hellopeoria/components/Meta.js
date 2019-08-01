import Head from 'next/head';

const Meta = props => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="stylesheet" type="text/css" href="static/nprogress.css" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <title>Hello Peoria // What to do in Peoria, IL right now</title>
    <meta
      itemProp="description"
      content="Restaurants, Bars, and Events in Peoria. Find out cool things to see and do in Peoria, IL"
    />
    <meta
      itemProp="image"
      content="http://hellopeoria.co/static/images/logo.png"
    />
    <meta
      name="description"
      content="Restaurants, Bars, and Events in Peoria. Find out cool things to see and do in Peoria, IL"
    />
  </Head>
);

export default Meta;
