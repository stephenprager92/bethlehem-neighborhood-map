/* 
	Map.js
	React component for a map display in the Neighborhood Map App
	Author: Steve Prager
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/Map.css'

/* 
   Adding directive here to ensure that 'google' variable is read correctly
   (source: https://stackoverflow.com/questions/48493960/using-google-map-in-react-component)
*/
/* global google */

class Map extends Component {

	/* Map required props */
	static propTypes = {
		locations: PropTypes.array.isRequired
	}

	/* 
	  RETRIEVE GOOGLE MAPS API WITHIN REACT - USED WHEN COMPONENT WILL AND DOES MOUNT

	  NOTE: we need to do this using a promise since the retrieval is asynchronous. My 
	  code / approach for this is taken from https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
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

  componentDidMount() {

    // Once the Google Maps API finishes loading, initialize the map at the Bethlehem city center
    this.getMapsAPI().then((google) => {
      const bethlehemCenter = {lat: 40.6139, lng: -75.3705};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: bethlehemCenter
      });

      // Add our neighborhood locations to the map as markers
      for (let location of this.props.locations) {
	      const marker = new google.maps.Marker({
	          position: {lat: location.lat, lng: location.lng},
	          title: location.title,
	          map: map
	      });
      }   
    });
  }

  /* Render the map (just a div) */
  render() {
    return (
        <div id="map"></div>
    )
  }
}

export default Map