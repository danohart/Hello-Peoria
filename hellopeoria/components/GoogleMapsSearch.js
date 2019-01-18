import React, { Component } from 'react';

const googleapi = 'AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U';
const searchTerm = 'Bar';
const latLong = '40.694592,-89.590363'; // Peoria IL Latitude and Longitude 


    const res = fetch ('https://maps.googleapis.com/maps/api/place/textsearch/json?query=Restaurants&location=40.694592,-89.590363&radius=7000&fields=id,name,place_id,formatted_address&key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U');

    console.log('file:', res);

// uploadFile = async e => {
//     console.log('Uploading file...');
//     const files = e.target.files;
//     const data = new FormData();
//     data.append('file', files[0]);
//     data.append('upload_preset', 'hellopeoria');

//     const res = await fetch ('https://api.cloudinary.com/v1_1/danielhart/image/upload', {
//         method: 'POST',
//         body: data
//     });

//     const file = await res.json();
//     console.log('file:', file);
//     this.setState({
//         image: file.secure_url,
//         largeImage: file.eager[0].secure_url
//     })
// };


// // Search 1 result but more control of data received
// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=bars&inputtype=textquery&fields=id,formatted_address,name,opening_hours,rating&locationbias=circle:7000@40.694592,-89.590363&key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U

// // Search Nearby API URL
// https://maps.googleapis.com/maps/api/place/textsearch/json?query=Bars&location=40.694592,-89.590363&radius=7000&key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U

class GoogleMapsSearch extends Component {
    request = async (e) => {
        const res = await fetch ('https://maps.googleapis.com/maps/api/place/textsearch/json?query=Bars&location=40.694592,-89.590363&radius=7000&key=AIzaSyAuttk2zvb-3npbAgYFWg0vl_jc_0mYf0U');
    
        const file = await res.json();
        console.log('file:', file);
    };
   
    render() {
        return (
            <div>
                <h1>Look in the console</h1>
            </div>
        );
    }
}

export default GoogleMapsSearch;