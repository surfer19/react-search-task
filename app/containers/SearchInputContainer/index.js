// import axios from 'axios';
import SearchInput from '../../components/SearchInput'
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
import { fetchPlaces, changeSelectedOptions } from './action';
import { makeSelectPlaces, makeSelectLoading, makeSelectError } from './selectors'

class SearchInputContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.selectedInstance = this.props.instanceType;
  }
  state = {
    places: [],
    selectedOption: '',
  }
  // TODO: refactor we need to have internal react state
  handleSelection = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
    return this.props.dispatch(changeSelectedOptions(selectedOption.value, this.selectedInstance));
  }

  handleChange = (changedValue) => {
    console.log('changedValue: ', changedValue)
    return changedValue ? this.props.dispatch(fetchPlaces(changedValue)): '';
  }   

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    // array contain all current place options from API when user type letters
    const currentPlaces = [];
    this.props.places.map((place, idx) => {        
      currentPlaces.push ({
        value: place.id,
        label: place.value
      });
    })        
  
    return (
        <div className="col">
          <SearchInput customPlaceholder={this.props.customPlaceholder}
                  selectedOption={selectedOption}
                  currentPlaces={currentPlaces}
                  onInputChange={callbackVal => this.handleChange(callbackVal)} 
                  onChange={callbackVal => this.handleSelection(callbackVal)} />
        </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  places: makeSelectPlaces(),
});

// const mapStateToProps = createStructuredSelector({});
// `mode` is an optional argument, default value is `RESTART_ON_REMOUNT`
const withSaga = injectSaga({ key: 'SearchContainer', saga}); //mode: RESTART_ON_REMOUNT });
const withConnect = connect(mapStateToProps, null);
const withReducer = injectReducer({ key: 'SearchContainer', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchInputContainer);