import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_WORDS_REQUEST = 'FETCH_WORDS_REQUEST';
export const fetchWordsRequest = () => ({
    type: FETCH_WORDS_REQUEST
});

export const FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS';
export const fetchWordsSuccess = words => ({
    type: FETCH_WORDS_SUCCESS,
    words
});

export const FETCH_WORDS_ERROR = 'FETCH_WORDS_ERROR';
export const fetchWordsError = error => ({
    type: FETCH_WORDS_ERROR,
    error
});

export const fetchWords = () => dispatch => {
    dispatch(fetchWordsRequest());
    return (
        fetch(API_BASE_URL, {
            method: 'GET'
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(data => dispatch(fetchWordsSuccess(data)))
        .catch(err => {
            dispatch(fetchWordsError(err));
        })
    );
}