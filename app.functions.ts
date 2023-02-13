const API_KEY = 'YOUR_API_KEY';
const LATITUDE = 37.4219999;
const LONGITUDE = -122.0840575;

const API_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LATITUDE},${LONGITUDE}&key=${API_KEY}`;

fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
        const location = data.results[0].formatted_address;
        console.log(location);
    })
    .catch((error) => console.error(error));
