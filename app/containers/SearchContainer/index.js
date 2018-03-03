import React from 'react';
import axios from 'axios';

import Search from '../../components/Search'


export default class SearchContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    places: []
  }
  componentDidMount() {
    // get all places
    axios.get(`https://api.skypicker.com/places`)
      .then(res => {
        const places = res.data;
        console.log('get', places);
        this.setState({ places });
      })
  }
  render() {
    return (
      <div>
        <Search allPlaces={this.state.places}/>
        {/* { this.state.places.map(place => <li key={place.id}> {place.value}</li>)} */}
      </div>
    );
  }
}
