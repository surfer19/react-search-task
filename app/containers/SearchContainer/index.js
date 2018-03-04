// import React from 'react';
import axios from 'axios';

import Search from '../../components/Search'

/**
 * Saga + redux stuff
 */
import { RESTART_ON_REMOUNT } from 'utils/constants';

// new
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

// TODO: presunut
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {fetchPlaces} from './action';
import { makeSelectPlaces, makeSelectLoading, makeSelectError } from './selectors'

// const fetch = fetchPlaces();

class SearchContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
  }
  state = {
    places: [],
    selectedOption: ''
  }
  componentDidMount() {
    // get all places
    // axios.get(`https://api.skypicker.com/places`)
    //   .then(res => {
    //     const places = res.data;
    //     console.log('get', places);
    //     this.setState({ places });
    //   })
    // this.state = {};
  }

  handleSelection = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  handleChange = (changedValue) => {
    return changedValue ? this.props.dispatch(fetchPlaces(changedValue)): '';
  }   

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const currentPlaces = [];
    this.props.places.map(place => {        
      currentPlaces.push ({
        value: place.id,
        label: place.value
      });
    })        

    console.log('value', value);
    // return (
    //   <div>
    //     <button onClick={() => this.props.dispatch(fetchPlaces())
    //     }>Show Dog</button>
    //       {this.props.loading 
    //         ? <p>Loading...</p> 
    //         : this.props.error
    //             ? <p>Error, try again</p>
    //             : <p><img src={this.props.url}/></p>}
    //   </div>
    // )
  
    return (
      <div> 
      <Select
        value={this.state.selectedOption}
        onInputChange={this.handleChange} //this.handleChange
        onChange={this.handleSelection}
        options={currentPlaces || []}
        placeholder='Fly from...'
      /> 
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  url: makeSelectPlaces(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  places: makeSelectPlaces(),
});

// const mapStateToProps = createStructuredSelector({});
// `mode` is an optional argument, default value is `RESTART_ON_REMOUNT`
const withSaga = injectSaga({ key: 'SearchContainer1', saga}); //mode: RESTART_ON_REMOUNT });
const withConnect = connect(mapStateToProps, null);
const withReducer = injectReducer({ key: 'SearchContainer2', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchContainer);