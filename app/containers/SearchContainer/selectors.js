import { createSelector } from 'reselect';

const selectSearch = (state) => state.get('search')

export const makeSelectUrl = () => createSelector(
  selectSearch,
  (selectState) => {
    //  console.log('URLL!!!!!!', selectState.get('url')) 
     return selectState.get('url')
  }
);

export const makeSelectLoading = () => createSelector(
  selectSearch,
  (selectState) => {
    // console.log('LOADING!!!!!!', selectState.get('url')) 
     return selectState.get('loading')
  }
);

export const makeSelectError = () => createSelector(
  selectSearch,
  (selectState) => {
    // console.log('ERROR!!!!!!', selectState.get('url')) 
     return selectState.get('error')
  }
);

export const makeSelectPlaces = () => createSelector(
  selectSearch,
  (selectState) => {
     return selectState.get('places')
  }
);