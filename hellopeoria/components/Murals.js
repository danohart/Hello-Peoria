import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import Geocode from "react-geocode";
import Loading from "./Loading";

const ALL_MURALS_QUERY = gql`
  query {
    places(where: { category: "Mural" }) {
      id
      name
      description
      image
      address
    }
  }
`;

const renderLatLng = () => {
  Geocode.setApiKey("AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U");
  Geocode.setLanguage("en");
  const getGeoCode = Geocode.fromAddress("Peoria, IL").then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    error => {
      console.error(error);
    }
  );
  console.log(getGeoCode);
  return getGeoCode;
};

class Murals extends Component {
  render() {
    console.log("lat long", renderLatLng);
    return (
      <>
        <div style={{ height: "50vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U"
            }}
            defaultCenter={{ lat: 40.693649, lng: -89.588989 }}
            defaultZoom={13}
          >
            {renderLatLng}
          </GoogleMapReact>
        </div>
        <Query query={ALL_MURALS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <>
                <div className="card-wrapper">
                  {data.places.map(mural => (
                    <div className="card" key={mural.id}>
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url(${mural.image})`
                        }}
                      >
                        <Link href={`https://facebook.com/event/` + mural.id}>
                          <a target="_blank" className="featured-link" />
                        </Link>

                        <div className="title-wrapper">
                          <div className="title">
                            <h2>{mural.name}</h2>
                          </div>
                        </div>
                      </div>
                      <div className="description">{mural.description}</div>
                    </div>
                  ))}
                </div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Murals;
