import Head from 'next/head';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-41524322-16');
ReactGA.pageview(window.location.pathname + window.location.search);

const Meta = () => (
    <Head>
        <meta name='viewport' content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <title>Hello Peoria</title>

    </Head>
);

export default Meta;