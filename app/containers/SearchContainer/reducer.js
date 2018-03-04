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
} from './constants';

// The initial state of the App
const initialState = fromJS({
  url: '',
  loading: true,
  error: false,
  places: []
});

function searchReducer(state = initialState, action) {
//     console.log('search reducer state = ', state);
//   console.log('search reducer action type = ', action.type);
  switch (action.type) {
    case CHANGE_INPUT_PLACES:
    //   return {
    //       url: '',
    //       loading: true,
    //       error: false
    //   }
    return state
    .set('url', '')
    .set('loading', true)  
    .set('error', false)
    .set('places', []);

    case CHANGE_INPUT_PLACES_SUCCESS:
        console.log('action.places', action.places);
        // return {
        //     url: action.url,
        //     loading: false,
        //     error: false,
        // };
        return state
        .set('url', '')    
        .set('loading', false)  
        .set('error', false)
        .set('places', action.places)

    case CHANGE_INPUT_PLACES_FAIL:
        // return {
        //     url: action.url,
        //     loading: true,
        //     error: false,
        // };
        return state
        .set('url', '')
        .set('loading', true)  
        .set('error', true)
        .set('places', []);

        // .set('username', action.name.replace(/@/gi, ''));
    case 'FETCHED_PLACES':
        return state
        .set('url', action.url)
        .set('loading', false)  
        .set('error', false)
        .set('places', []);
    default:
    console.log('Default!');
    return state
    // .set('url', '')
    // .set('loading', false)  
    // .set('error', false);

    //     console.log('default');
    //   return state;
  }
}

export default searchReducer;
