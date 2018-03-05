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
    CHANGE_SELECTED_OPTIONS
} from './constants';

// The initial state of the App
const initialState = fromJS({
  url: '',
  loading: false,
  error: false,
  places: [],
  selectedOptionTo: '',
  selectedOptionFrom: '',
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT_PLACES:
        return state
        .set('loading', true)  
        .set('error', false)

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
            .set('selectedOptionFrom', action.selectedOptions);            

        } else if (action.selectedInstance === 'flyTo'){
            return state    
            .set('selectedOptionTo', action.selectedOptions);            

        } else {
            throw new Error('please pass valid instance name to component - flyFrom/flyTo');
        }
        
    default:
    console.log('Default!');
    return state
  }
}

export default searchReducer;
