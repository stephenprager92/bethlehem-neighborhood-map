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
		locations: PropTypes.array.isRequired,
		toggleView: PropTypes.func.isRequired
	}

    // State contains references to map and all  markers, we 
    // will toggle visibility of these as needed
	state = {
		map: {},
		markers: [],
		foursquareCreds: {
	      clientID: '0NQCIVNQJPAL3MOTXGV22C0IZF4JW1ORFWNHL1ABFFA4UOFN',
	      clientSecret: '4Q5ATV5JFNDYUCCESGII1OJ2MHTQHMWIBVYXGTVNV3DYKLUG',
	      requestDate: '20180323'
	    }        
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
		    	zoom: 14,
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
		            location: location,
	                map: map
	            });

                // Add event listeners to each marker to assign an info window if clicked
	            marker.addListener('click', function() {

	                // MAYBE I NEED TO MAKE FOURSQUARE API CALL HERE - TRY THAT
	                // STEP 1 - UPDATE THE SYNTAX BELOW
	                // MAY ALSO HONESTLY NEED TO MOVE BACK - CHECK BOTH PLACES
			     //    fetch(`https://api.foursquare.com/v2/venues/${marker.location.foursquareID}?client_id=${this.state.foursquareCreds.clientID}&client_secret=${this.state.foursquareCreds.clientSecret}&v=${this.state.foursquareCreds.requestDate}`)
	       //              .then((result) => location.foursquareInfo = result.json())
				    //     .catch((error) => console.error('Error: ', error))
				    // }
				    map.setCenter(marker.position)

				    // Check to make sure the infowindow is not already opened on this marker
	                if (infoWindow.marker !== marker) {
			            infoWindow.marker = marker;
		                infoWindow.setContent('<div id="info-window">' 
		                	                   + this.location.title
		                	                   + '<br/>Rating: ' + //this.location.foursquareInfo.response.venue.rating + 
		                	                   '</div>');
			            infoWindow.open(map, marker);
			            // Make sure the marker property is cleared if the infowindow is closed.
		                infoWindow.addListener('closeclick', function() {
					        infoWindow.marker = null;
	                    });
		            }
		        });
		        /* 
		           Add two more event listeners to toggle the (bounce) animation
		           of the marker on click. Animation then removed after 750 ms (according to 
		           https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once
		           this is appropriate for two bounces of the marker
		        */
                marker.addListener('click', function() {
	                this.setAnimation(google.maps.Animation.BOUNCE);
	                setTimeout(function(){ marker.setAnimation(null); }, 750);
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

	  	// If there's only one marker, set it as the new center of the map for easy viewing
	  	if (this.props.locations[0] && this.props.locations.length === 1) {
	  		const newCenter = this.props.locations[0]
	  		// Add .002 to provide a little extra space for info window
	  		map.setCenter({lat: newCenter.lat + .002, lng: newCenter.lng})
	  	}
	}

	// Render the map and the list view toggle (only shows on mobile screen sizes)
	render() {
	    return (
	    	<div id="map-container">
		    	<nav id="list-view-toggle"
		    	     onClick={this.props.toggleView}>
			    	Click Here to Find a Location...
			    </nav>
		        <div id="map"></div>
		    </div>
	    )
	}
}

export default Map