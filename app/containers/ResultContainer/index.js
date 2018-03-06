import React from 'react';
import PropTypes from 'prop-types';
import configureStore from '../../configureStore';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Moment from 'moment';
import Search from '../../components/SearchInput/index';
import { makeSelectFlyFrom, makeSelectFlyTo, makeSelectFormSent, makeSelectDate, makeSelectResults } from '../SearchInputContainer/selectors'


class ResultContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = {
        submitedForm: false
    }
  }
    render() {
        return (
            <table className="table table-hover mt-5 justify-content-center" >                            
                <tbody>
                {             
                    (this.props.results && this.props.results.data)? 
                        this.props.results.data.map((flight, idx) => {                                        
                            return (                                                                         
                                <tr key={idx}>
                                    <td className="align-middle"><img src={`https://images.kiwi.com/airlines/64/${flight.airlines[0]}.png`} className="img-fluid" width="50px"/></td>
                                    <td className="align-middle">{flight.cityFrom} -></td>
                                    <td className="align-middle">{flight.cityTo}</td>
                                    <td className="align-middle">duration: {flight.fly_duration}</td>
                                    <td className="align-middle">{Moment.unix(flight.dTime).format('HH:mm')} - {Moment.unix(flight.aTime).format('HH:mm')}</td>                                
                                    <td className="align-middle"><button type="button" className="btn btn-outline-success">Book ({flight.conversion.EUR}EUR)</button></td>                                
                                </tr>                                                                          
                            )
                        })
                    : <tr></tr>                    
                }
                </tbody>
            </table>        
        );
    }
}

export default connect(createStructuredSelector({
    flyFrom: makeSelectFlyFrom(),
    flyTo: makeSelectFlyTo(),
    formSubmited: makeSelectFormSent(),
    date: makeSelectDate(),
    results: makeSelectResults(),
}))(ResultContainer);