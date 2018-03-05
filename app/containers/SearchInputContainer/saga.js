import { takeLatest, takeEvery, call, put, select, take } from 'redux-saga/effects';
import { changePlaces, changePlacesSuccess, changePlacesFailed } from './action';
import { makeSelectUrl } from './selectors';
// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all` 
  yield [
    takeEvery('FETCHED_PLACES', fetchPlacesAsync),
  ];
}
  
function* fetchPlacesAsync() {
    let getCurrentUrl = yield select(makeSelectUrl());
    // prevent empty calls
    if (getCurrentUrl != '') {
        // console.log('fetchPlacesAsync', getCurrentUrl);
        try {
            yield put(changePlaces());
            const data = yield call(() => {
                return fetch('https://api.skypicker.com/places?term='+ getCurrentUrl +'&v=2&locale=en')
                .then((response) => {
                    if(response.ok) {
                    // console.log('response je ok!')
                    return response.json();
                    } else {
                    throw new Error('Server response wasn\'t OK');
                    }
                })            
            });
            // console.log('vysl data', data);
            yield put(changePlacesSuccess(data));
        } catch (error) {
            yield put(changePlacesFailed());
        }
    }
}