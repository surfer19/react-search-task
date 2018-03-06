/*
 * searchReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
    CHANGE_INPUT_PLACES,
    CHANGE_INPUT_PLACES_SUCCESS,
    CHANGE_INPUT_PLACES_FAIL,
    CHANGE_SELECTED_OPTIONS,
    CHANGE_FORM_SUBMIT,
    CHANGE_SELECTED_DATE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  url: '',
  loading: false,
  error: false,
  places: [],
  selectedOptionTo: '',
  selectedOptionFrom: '',
  formSubmit: false,
  selectedDate: {},
  resultData: {}
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT_PLACES:
        return state
            .set('loading', true)  
            .set('error', false)
            .set('formSubmit', false);

    case 'CHANGE_FORM_BEFORE':
        return state 
          .set('resultData', {});

    case CHANGE_INPUT_PLACES_SUCCESS:
        // console.log('action.places', action.places);
        return state
            .set('url', '')    
            .set('loading', false)  
            .set('error', false)
            .set('places', action.places);

    case CHANGE_INPUT_PLACES_FAIL:
        return state
            .set('url', '')
            .set('loading', false)  
            .set('error', true)

    case 'FETCHED_PLACES':
        return state
            .set('url', action.url)
            .set('loading', false)  
            .set('error', false)
            .set('places', []);
    
    case CHANGE_SELECTED_OPTIONS:        
        if (action.selectedInstance === 'flyFrom'){
            return state
                .set('selectedOptionFrom', action.selectedOptions)
                .set('formSubmit', false);            
        } else if (action.selectedInstance === 'flyTo'){
            return state    
                .set('selectedOptionTo', action.selectedOptions)          
                .set('formSubmit', false);
        } else {
            throw new Error('please pass valid instance name to component - flyFrom/flyTo');
        }

    case CHANGE_FORM_SUBMIT:
        return state
             .set('formSubmit', true) 
             .set('resultData', action.resultData);
    
    case CHANGE_SELECTED_DATE:
        return state
             .set('selectedDate', action.selectedDate)
             .set('formSubmit', false);

    default:
        console.log('Default!');
        return state
  }
}

export default searchReducer;
