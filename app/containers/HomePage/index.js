/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Navigation from '../../components/Navigation';
import SearchInputContainer from '../SearchInputContainer';
import ResultContainer from '../ResultContainer';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super();
  }
  render() {
    return (
      <div>
        <Navigation/>              
        <div className="container">
        <h6>Only Direct flights <span className="badge badge-secondary mb-3">New</span></h6>
            <SearchInputContainer/>
            <ResultContainer/>
        </div>
      </div>
    );
  }
}
