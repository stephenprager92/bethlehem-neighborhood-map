/* 
  App.js
  React component for the overall app / parent component display of the Neighborhood Map App
  Author: Steve Prager
*/

import React, { Component } from 'react';
import './css/App.css';
import Map from './components/Map'

class App extends Component {

  /* 
     State contains all of the app's data and passes it down to child components as needed
     Here, that's the locations in our neighborhood (Bethlehem, PA)
  */
  state = {
    locations: [ 
                 { 
                   title: "Sands Casino",
                   lat: 40.6150,
                   lng: -75.3581
                 },
                 {
                   title: "Lehigh University",
                   lat: 40.6069,
                   lng: -75.3783
                 },
                 {
                   title: "Banana Factory",
                   lat: 40.6124,
                   lng: -75.3795
                 },
                 {
                   title: "Bethlehem Brew Works",
                   lat: 40.6220,
                   lng: -75.3822
                 },
                 {
                   title: "Bethlehem Skate Plaza",
                   lat: 40.6124,
                   lng: -75.3554
                 },
                 {
                   title: "Moravian Book Shop",
                   lat: 40.6195,
                   lng: -75.3818
                 },
                 {
                   title: "SteelStacks",
                   lat: 40.6153,
                   lng: -75.3682
                 },
                 {
                   title: "Musikfest",
                   lat: 40.6140,
                   lng: -75.3676
                 },
                 {
                   title: "Billy's Downtown Diner",
                   lat: 40.6221,
                   lng: -75.3781
                 },
                 {
                   title: "National Museum of Industrial History",
                   lat: 40.6128,
                   lng: -75.3706
                 },
               ]
  }

  render() {
    return (
      <div className="App">
        <Map locations={this.state.locations}/>
        {/* There should be a sidebar component here. A sidebar component should have an item component*/}
      </div>
    );
  }
}

export default App;
