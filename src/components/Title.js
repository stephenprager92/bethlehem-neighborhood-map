/* 
	Title.js
	React component for title banner display in the Neighborhood Map App
	Author: Steve Prager
*/

import React from 'react'
import '../css/Title.css'

/* 
    Since we are not passing any methods into the title banner, 
    we can make do with a simple functional component
*/
function Title(props) {
	return <div id="title">
	           Steve's Neighborhood Map - <span id="city-name">(Bethlehem, PA)</span>
           </div>
}

export default Title