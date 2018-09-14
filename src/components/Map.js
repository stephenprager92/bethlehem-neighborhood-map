/* 
	Map.js
	React component for a map display in the Neighborhood Map App
	Author: Steve Prager
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/Map.css'

/* 
   Adding directive to ensure that 'google' variable is read correctly
   (source: https://stackoverflow.com/questions/48493960/using-google-map-in-react-component)
*/
/* global google */


class Map extends Component {

	/* Map required props */
	static propTypes = {
		// onUpdateShelf: PropTypes.func.isRequired,
		// bookItem: PropTypes.object.isRequired
	}

	/* 
	   RETRIEVE GOOGLE MAPS API - USED WHEN COMPONENT WILL AND DOES MOUNT
	   NOTE: we need to do this using a promise since the retrieval is asynchronous. 
	   Approach for this derived from https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
	*/
	getMapsAPI() {
		// If we haven't already defined the promise, define it
		if (!this.googleMapsPromise) {
	        this.googleMapsPromise = new Promise((resolve) => {
		        // Add a global handler for when the API finishes loading
		        window.resolveGoogleMapsPromise = () => {
		            // Resolve the promise
		            resolve(google);
			        // Tidy up
		            delete window.resolveGoogleMapsPromise;
		        };

		        // Load the Google Maps API
		        const script = document.createElement("script");
		        const APIKey = 'AIzaSyBGQCj_jyyUtHUTkIeU8qljLqcQAbTvtJk';
		        script.src = `https://maps.googleapis.com/maps/api/js?key=${APIKey}&callback=resolveGoogleMapsPromise`;
		        script.async = true;
		        document.body.appendChild(script);
	        });
	    }

	    // Return a promise for the Google Maps API
	    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getMapsAPI();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getMapsAPI().then((google) => {
      const hellertown = {lat: 40.5823215, lng: -75.3379568};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: hellertown
      });
      const marker = new google.maps.Marker({
        position: hellertown,
        map: map
      });
    });
  }

  render() {
    return (
        <div id="map"></div>
    )
  }
}

export default Map