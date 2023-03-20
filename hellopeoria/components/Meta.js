import Head from "next/head";

const Meta = (props) => (
  <Head>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta charSet='utf-8' />
    <link rel='stylesheet' type='text/css' href='/nprogress.css' />
    <link rel='shortcut icon' href='/favicon.png' />
    <title>
      {props.title
        ? `${props.title} // What to do in Peoria, IL right now`
        : "Hello Peoria // What to do in Peoria, IL right now"}
    </title>
    <meta
      itemProp='description'
      content='Restaurants, Bars, and Events in Peoria. Find out cool things to see and do in Peoria, IL'
    />
    <meta itemProp='image' content='/images/hello-peoria-il.png' />
    <meta
      name='description'
      content='Restaurants, Bars, and Events in Peoria. Find out cool things to see and do in Peoria, IL'
    />
    {/*<!-- Facebook Meta Tags -->*/}
    <meta
      property='og:title'
      content='Hello Peoria // What to do in Peoria, IL right now'
      key='ogtitle'
    />
    <meta
      property='og:description'
      content='Restaurants, Bars, and Events in Peoria. Find out cool things to see and do in Peoria, IL'
      key='ogdescription'
    />
    <meta
      property='og:image'
      content='/images/hello-peoria-il.png'
      key='ogimage'
    />
    <meta property='og:type' content='website' />

    {/*<!-- Twitter Meta Tags -->*/}
    <meta
      name='twitter:title'
      content='Hello Peoria // What to do in Peoria, IL right now'
    />
    <meta
      name='twitter:description'
      content='Restaurants, Bars, and Events in Peoria. Find out cool things to see and do in Peoria, IL'
    />
    <meta name='twitter:image' content='/images/hello-peoria-il.png' />
    <meta name='twitter:card' content='summary_large_image' />
  </Head>
);

export default Meta;
