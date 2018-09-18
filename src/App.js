/* 
  App.js
  React component for the overall app / parent component display of the Neighborhood Map App
  Author: Steve Prager
*/

import React, { Component } from 'react';
import './css/App.css';
import Map from './components/Map'
import Title from './components/Title'
import ListView from './components/ListView'
import Footer from './components/Footer'

class App extends Component {

  /* 
     State contains all of the app's data and passes it down to child components as needed
     Here, that's the locations in our neighborhood (Bethlehem, PA)
     Foursquare API credentials for the app also stored here
  */
  state = {
    locations: [ 
                 { 
                   title: "Sands Casino",
                   lat: 40.6150,
                   lng: -75.3581,
                   foursquareID: "49eeaf08f964a52078681fe3",
                   foursquareInfo : {}
                 },
                 {
                   title: "Lehigh University",
                   lat: 40.6069,
                   lng: -75.3783,
                   foursquareID: "4abe5688f964a520d38c20e3",
                   foursquareInfo : {}
                 },
                 {
                   title: "Banana Factory",
                   lat: 40.6124,
                   lng: -75.3795,
                   foursquareID: "4aea925ef964a520e6bb21e3",
                   foursquareInfo : {}
                 },
                 {
                   title: "Bethlehem Brew Works",
                   lat: 40.6220,
                   lng: -75.3822,
                   foursquareID: "4ac25dc5f964a520d89820e3",
                   foursquareInfo : {}
                 },
                 {
                   title: "Bethlehem Skate Plaza",
                   lat: 40.6124,
                   lng: -75.3554,
                   foursquareID: "4c40b95d3735be9a514e17a4",
                   foursquareInfo : {}
                 },
                 {
                   title: "Moravian Book Shop",
                   lat: 40.6195,
                   lng: -75.3818,
                   foursquareID: "4b11abfff964a520eb8123e3",
                   foursquareInfo : {}
                 },
                 {
                   title: "SteelStacks",
                   lat: 40.6153,
                   lng: -75.3682,
                   foursquareID: "542856ba498e85a2c0dbf449",
                   foursquareInfo : {}
                 },
                 {
                   title: "Musikfest Cafe",
                   lat: 40.6140,
                   lng: -75.3676,
                   foursquareID: "4cd1c7213e63721e469ba5cc",
                   foursquareInfo : {}
                 },
                 {
                   title: "Billy's Downtown Diner",
                   lat: 40.6221,
                   lng: -75.3781,
                   foursquareID: "53e4d8de498e6a14dbfed43b",
                   foursquareInfo : {}
                 },
                 {
                   title: "National Museum of Industrial History",
                   lat: 40.6128,
                   lng: -75.3706,
                   foursquareID: "4e35c34e1850ad8463dc038c",
                   foursquareInfo : {}
                 },
               ],
    foursquareCreds: {
      clientID: '0NQCIVNQJPAL3MOTXGV22C0IZF4JW1ORFWNHL1ABFFA4UOFN',
      clientSecret: '4Q5ATV5JFNDYUCCESGII1OJ2MHTQHMWIBVYXGTVNV3DYKLUG',
      requestDate: '20180323'
    }          
  }

  /* 
    Asynchronously retrieve and add location data from the foursquare API 
    AFTER the app component initially mounts. Once retrieved, set the new state
  */
  componentDidMount() {
    // let updatedLocations = this.state.locations
    // for (let location of updatedLocations) {
    //   fetch(`https://api.foursquare.com/v2/venues/${location.foursquareID}?client_id=${this.state.foursquareCreds.clientID}&client_secret=${this.state.foursquareCreds.clientSecret}&v=${this.state.foursquareCreds.requestDate}`)
    //   .then((result) => console.log(result.response.venue.location.formattedAddress))//location.foursquareInfo = response)
    // }
    // this.setState({ locations: updatedLocations })
  }

  render() {
    return (
      <div className="App">
        <div id="title-section" className="row section">
          <Title/>
        </div>
        <div id="content-section">
          <div id="list-view-section" className="column section">
            <ListView locations={this.state.locations}/>
          </div>
          <div id="map-section" className="column section">
            <Map locations={this.state.locations}/>
          </div>
        </div>
        <div id="footer-section">
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
