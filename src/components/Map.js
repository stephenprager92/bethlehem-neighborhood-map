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

    // State contains references to map and all  markers, we 
    // will toggle visibility of these as needed
	state = {
		map: {},
		markers: []
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
		    	zoom: 14.5,
		    	center: bethlehemCenter
	        });

	        // Create an info window for our markers
	        const infoWindow = new google.maps.InfoWindow();

	        // Add our neighborhood locations to the map as markers
	        // Store our markers in the component's state as they are created
	        let storedMarkers = []
	        for (let location of this.props.locations) {
			    const marker = new google.maps.Marker({
			        position: {lat: location.lat, lng: location.lng},
		            title: location.title,
	                map: map
	            });

                // Add event listeners to each marker to assign an info window if clicked
	            marker.addListener('click', function() {
	                // Check to make sure the infowindow is not already opened on this marker
	                if (infoWindow.marker !== marker) {
			            infoWindow.marker = marker;
		                infoWindow.setContent('<div id="info-window">' + marker.title + '</div>');
			            infoWindow.open(map, marker);
			            // Make sure the marker property is cleared if the infowindow is closed.
		                infoWindow.addListener('closeclick', function() {
					        infoWindow.marker = null;
	                    });
		            }
		        });
		        // Add two more event listeners to toggle the (bounce) animation
		        // of the marker on click. Animation then removed on mouseout
                marker.addListener('click', function() {
	                this.setAnimation(google.maps.Animation.BOUNCE);
                });
                marker.addListener('mouseout', function() {
	                this.setAnimation(null);
                });
                storedMarkers.push(marker)
            }
            // Set the map state variables of the component for future manipulation
            this.setState({map: map, markers: storedMarkers})
        });
    }

    /* 
       When the component updates (recieves new filtered locations as props), set the 
       visibility of the markers in the map accordingly

       NOTE - Marker / location titles must be unique for this to work. This version of the 
       app satisfies that but keep in mind going forward
    */
	componentDidUpdate() {
		const { map, markers } = this.state

	    // First, hide all markers from the map
	  	for (let marker of markers) {
		    marker.setMap(null)
	  	}
	    // Then, show the ones that are in the currently visible locations
	  	for (let location of this.props.locations) {
	  		for (let marker of markers) {
	  			if (marker.title === location.title) {
		  			marker.setMap(map)	
	  			}
	  		}
	  	}
	}

	// Render the map (just a div)
	render() {
	    return (
	        <div id="map"></div>
	    )
	}
}

export default Map