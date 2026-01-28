import React from "react";
import Head from "next/head";
import { getPlaceById, getAllPlaceIds } from "../../lib/data";

export default function SinglePlace({ place, setList }) {
  if (!place) {
    return <div>Place not found</div>;
  }

  // Get category keyword for LoremFlickr
  function getCategoryKeyword(category) {
    const keywords = {
      'Cafe': 'coffee,cafe',
      'Coffee': 'coffee,cafe',
      'Restaurant': 'restaurant,food',
      'Bar': 'bar,cocktail',
      'Breakfast': 'breakfast,brunch',
      'Mural': 'mural,street-art',
      'Attraction': 'attraction,landmark',
      'Shop': 'shop,store',
      'Entertainment': 'entertainment,theater',
    };
    return keywords[category] || 'restaurant,city';
  }

  // Get image with LoremFlickr fallback using category keyword
  const category = place.mainCategory?.name || place.category || 'peoria';
  const keyword = getCategoryKeyword(category);
  const lockId = place.id?.slice(-6) || '1';
  const placeholderImage = `https://loremflickr.com/1200/630/${keyword}?lock=${lockId}`;
  const displayImage = place.image || placeholderImage;
  const ogImage = place.largeImage || place.image || placeholderImage;

  function determineAddress() {
    if (place.address && place.address.formattedAddress)
      return place.address.formattedAddress;
    if (!place.address) return place.altAddress;
  }

  return (
    <div className='single-place-wrapper'>
      <Head>
        <title>{place.name} // Hello Peoria</title>
        <meta name='description' content={place.description} />
        <meta itemProp='name' content={place.name} />
        <meta itemProp='description' content={place.description} />
        <meta itemProp='image' content={ogImage} />

        <meta property='og:title' content={place.name} key='ogtitle' />
        <meta
          property='og:description'
          content={place.description}
          key='ogdescription'
        />
        <meta property='og:image' content={ogImage} key='ogimage' />
        <meta property='og:type' content='website' />

        <meta name='twitter:title' content={place.name} />
        <meta name='twitter:description' content={place.description} />
        <meta name='twitter:image' content={ogImage} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <div className='single-place'>
        <div className='image'>
          <img src={displayImage} alt={place.name} />
        </div>
        <h1>{place.name}</h1>
        <p>{place.description}</p>
        <button onClick={() => setList(place)}>Add To List</button>
        <div className='address'>{determineAddress()}</div>
      </div>
      <div className='map'>
        {place.category === "Mural" ? (
          <iframe
            src={
              "https://www.google.com/maps/embed/v1/place?key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U&q=" +
              (place.address
                ? place.address.formattedAddress
                : place.altAddress
                ? place.altAddress
                : "") + "Peoria, IL"
            }
            width='600'
            height='450'
            frameBorder='0'
            allowFullScreen
          />
        ) : (
          <iframe
            src={
              "https://www.google.com/maps/embed/v1/place?key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U&q=" +
              place.name +
              " " +
              determineAddress()
            }
            width='600'
            height='450'
            frameBorder='0'
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const placeIds = await getAllPlaceIds();

  const paths = placeIds.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: 'blocking', // Generate new pages on-demand if not pre-rendered
  };
}

export async function getStaticProps({ params }) {
  const place = await getPlaceById(params.id);

  if (!place) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      place,
    },
    revalidate: 3600,
  };
}
