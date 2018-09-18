/* 
	ListView.js
	React component for a list view display in the Neighborhood Map App
	Author: Steve Prager
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import '../css/ListView.css'

// NEXT STEPS!!!!!!!!!! - STYLE THIS AND ADD WAY TO SEND FILTERS UP TO PARENT (APP) COMPONENT

class ListView extends Component {

	/* ListView required props */
	static propTypes = {
		locations: PropTypes.array.isRequired
	}

    /*
       State variables
       By default, the filtered locations are all locations
    */
	state = {
		searchQuery: '',
		filteredLocations: this.props.locations
	}

    // Helper method - filters locations and updates the 
    // search query as users type in the input field
	updateSearch = (query) => {
		
		const { locations } = this.props
		let showingLocations

		if (query) {
			const queryExp = new RegExp(escapeRegExp(query), 'i')
			showingLocations = locations.filter((location) => queryExp.test(location.title))
		} else {
			showingLocations = locations
		}

		this.setState({searchQuery: query, filteredLocations: showingLocations})
	}

	render() {
		return <div id="list-view">
		           <input type="text"
		                  placeholder="Search for locations"
		                  value={this.state.searchQuery}
						  onChange={(event) => this.updateSearch(event.target.value)}
				    />
				   <ul id="locations-list">
					   {this.state.filteredLocations.map((location) => 
					   	   <li className="list-location" key={location.foursquareID}>
							   {location.title}
						   </li>
					   	)}
				   </ul>
			   </div>
	}

}

export default ListView