import { CHANGE_INPUT_PLACES, 
         CHANGE_INPUT_PLACES_SUCCESS, 
         CHANGE_INPUT_PLACES_FAIL, 
         CHANGE_SELECTED_OPTIONS } from './constants';

export const changePlaces = () => {
    return {
        type: CHANGE_INPUT_PLACES
    }
}

export const changePlacesSuccess = (data) => {
    return {
        type: CHANGE_INPUT_PLACES_SUCCESS,
        places: data
    }
}

export const changePlacesFailed = () => {
    return {
        type: CHANGE_INPUT_PLACES_FAIL
    }
}

export const fetchPlaces = (dataUrl) => {
    console.log('fetch', dataUrl);
    return {
        type: 'FETCHED_PLACES',
        url: dataUrl
    }
}

export const changeSelectedOptions = (seletedOption, selectedInstance) => {
    return {
        type: CHANGE_SELECTED_OPTIONS,
        selectedOptions: seletedOption,
        selectedInstance: selectedInstance
    }
}