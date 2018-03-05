import { createSelector } from 'reselect';

const selectSearch = (state) => state.get('search')

export const makeSelectUrl = () => createSelector(
  selectSearch,
  (selectState) => {
     return selectState.get('url')
  }
);

export const makeSelectLoading = () => createSelector(
  selectSearch,
  (selectState) => {
     return selectState.get('loading')
  }
);

export const makeSelectError = () => createSelector(
  selectSearch,
  (selectState) => {
     return selectState.get('error')
  }
);

export const makeSelectPlaces = () => createSelector(
  selectSearch,
  (selectState) => {
     return selectState.get('places')
  }
);

export const makeSelectFlyFrom = () => createSelector(
  selectSearch,
  (selectState) => {
     return selectState.get('selectedOptionFrom')
  }
)

export const makeSelectFlyTo = () => createSelector(
  selectSearch,
  (selectState) => {
     return selectState.get('selectedOptionTo')
  }
)