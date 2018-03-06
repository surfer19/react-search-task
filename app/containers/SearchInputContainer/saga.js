import { takeLatest, takeEvery, call, put, select, take, delay } from 'redux-saga/effects';
import { changePlaces, changePlacesSuccess, changePlacesFailed, changeFormSubmit, changeFormBefore } from './action';
import { makeSelectUrl, makeSelectDate, makeSelectFlyTo, makeSelectFlyFrom } from './selectors';
import Moment from 'moment';
// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all` 
  yield [
    takeEvery('FETCHED_PLACES', fetchPlacesAsync),
    takeEvery('FETCHED_RESULTS', fetchResultsAsync)
  ];
}
function* fetchResultsAsync() {
    let date = yield select(makeSelectDate());
    date = Moment(date).format('DD/MM/YYYY'); // convert to string that we can concatenate
    let from = yield select(makeSelectFlyFrom());
    let to   = yield select(makeSelectFlyTo());
    
    try {
        yield put(changeFormBefore());
        const data = yield call(() => {
            return fetch(`https://api.skypicker.com/flights?v=2&locale=en&flyFrom=${from}&to=${to}&dateFrom=${date}&dateTo=${date}&directFlights=1`)
            .then((response) => {
                if(response.ok) {
                // console.log('response je ok!!!!!!!', response.json())
                return response.json();
                } else {
                throw new Error('Server response wasn\'t OK');
                }
            })            
        });
        console.log('vysl data', data);
        yield put(changeFormSubmit(data));
    } catch (error) {
        // yield put(changePlacesFailed());
        throw new Error('Fail fetch');
    }
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