
import SearchInput from '../../components/SearchInput'
import { RESTART_ON_REMOUNT } from 'utils/constants';
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
import { fetchPlaces,fetchResults, changeSelectedOptions, changeFormSubmit, changeSelectedDate } from './action';
import { makeSelectPlaces, makeSelectLoading, makeSelectError, makeSelectDate } from './selectors'
import { SingleDatePicker } from 'react-dates';

class SearchInputContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.selectedInstance = this.props.instanceType;
    this.state = {
      places: [],
      selectedOptionFrom: '',
      selectedOptionTo: '',
    }
  }

  handleSelection = (selectedOption, selectedInstance) => {
    if (selectedInstance === 'flyFrom'){
      this.setState({ selectedOptionFrom: selectedOption});
    } else { 
      this.setState({ selectedOptionTo: selectedOption});
    }
    // cannot be null
    let prevented = selectedOption ? selectedOption.value : ''
    return this.props.dispatch(changeSelectedOptions(prevented, selectedInstance));
  }

  handleChange = (changedValue) => {
    return changedValue ? this.props.dispatch(fetchPlaces(changedValue)): '';
  }   

  onDateChange(date) {
    this.setState({date});
    this.props.dispatch(changeSelectedDate(date));
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  handleFormSubmit = () => {
    return this.props.dispatch(fetchResults());
  }

  render() {
    const valueFrom = this.state.selectedOptionFrom;
    const valueTo = this.state.selectedOptionTo;
    
    // copy to new arr just attributes what we need 
    // array contain all current place options from API when user type letters
    const currentPlaces = [];
    this.props.places.map((place, idx) => {
      currentPlaces.push ({
        value: place.id,
        label: place.value,
      });
    })        
    const { focused, date } = this.state;

    return (
      <div className="row">
          <div className="col">
            <SearchInput customPlaceholder={"Fly from"}
                    selectedOption={valueFrom}
                    currentPlaces={currentPlaces}
                    onInputChange={callbackVal => this.handleChange(callbackVal)} 
                    onChange={callbackVal1 => this.handleSelection(callbackVal1, "flyFrom")} />
          </div>
          <div className="col">  
            <SearchInput customPlaceholder={"Fly to"}
                    selectedOption={valueTo}
                    currentPlaces={currentPlaces}
                    onInputChange={callbackVal => this.handleChange(callbackVal)} 
                    onChange={callbackVal2 => this.handleSelection(callbackVal2, "flyTo")} />
          </div>
          <div className="col">
          <SingleDatePicker
            small
            block
            id="date_input"
            date={date}
            placeholder="Departure"
            focused={focused}
            onDateChange={val => this.onDateChange(val)}
            onFocusChange={val => this.onFocusChange(val)}
            displayFormat="D/M/Y"/>
          </div>
          <div className="col">
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleFormSubmit}>Search</button>
          </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  places: makeSelectPlaces(),
  date: makeSelectDate(),
});

// const mapStateToProps = createStructuredSelector({});
// `mode` is an optional argument, default value is `RESTART_ON_REMOUNT`
const withSaga = injectSaga({ key: 'SearchContainer', saga}); 
const withConnect = connect(mapStateToProps, null);
const withReducer = injectReducer({ key: 'SearchContainer', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchInputContainer);