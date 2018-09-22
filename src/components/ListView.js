/* 
	ListView.js
	React component for a list view display in the Neighborhood Map App
	Author: Steve Prager
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/ListView.css'

class ListView extends Component {

	/* ListView required props */
	static propTypes = {
		locations: PropTypes.array.isRequired,
		onFilter: PropTypes.func.isRequired
	}

	state = {
		searchQuery: ''
	}

    // Helper method - filters location data in the parent component with the prop 
    // method and updates the search query as users type in the input field
	updateSearch = (query) => {
		this.props.onFilter(query)
		this.setState({searchQuery: query})
	}

	render() {
		return <div id="list-view">
		           <input type="text"
		                  id="list-view-search"
		                  placeholder="Search for locations"
		                  value={this.state.searchQuery}
						  onChange={(event) => this.updateSearch(event.target.value)}
				    />
				   <ul id="locations-list">
					   {this.props.locations.map((location) => 
					   	   <li className="list-location" 
					   	       key={location.foursquareID}
					   	       title={location.title}
					   	       onClick={(event) => this.updateSearch(event.target.title)}>
							   {location.title}
						   </li>
					   	)}
				   </ul>
			   </div>
	}

}

export default ListView