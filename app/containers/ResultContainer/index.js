import React from 'react';
import PropTypes from 'prop-types'; // TODO:
import configureStore from '../../configureStore';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

// majne
import { makeSelectFlyFrom, makeSelectFlyTo } from '../SearchInputContainer/selectors'

class ResultContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
  }

  render() {
    console.log('FROM => ',this.props.flyFrom);
    console.log('TO => ',this.props.flyTo);
    return (
        <div>
            hey I am result container
        </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
//   places: makeSelectPlaces(),
// });

export default connect(createStructuredSelector({
    flyFrom: makeSelectFlyFrom(),
    flyTo: makeSelectFlyTo(),
  }))(ResultContainer);