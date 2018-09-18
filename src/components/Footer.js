/* 
	Footer.js
	React component for footer banner display in the Neighborhood Map App
	Author: Steve Prager
*/

import React from 'react'
import '../css/Footer.css'

/* 
    Since we are not passing any methods into the footer banner, 
    we can make do with a simple functional component
*/
function Footer(props) {
	return <div id="footer">
	           <footer>
		           Brought to life with the aid of the <a href="https://cloud.google.com/maps-platform/">Google Maps Platform</a> and the <a href="https://developer.foursquare.com/places-api">Foursquare Places API</a>.
	           </footer>
           </div>
}

export default Footer