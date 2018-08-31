import {API_BASE_URL} from '../config';
import {startGame, setWord} from './game';

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

export const fetchWords = values => dispatch => {
    dispatch(fetchWordsRequest());
    dispatch(startGame());
    const {difficulty, minLength, maxLength} = values;
    const parameters = {difficulty, minLength, maxLength};
    let queryString = '';
    const keys = Object.keys(parameters);
    for (let i = 0; i < keys.length; i++){
        if(parameters[keys[i]]){
            if(queryString === '') {
                queryString += `?${keys[i]}=${parameters[keys[i]]}`
            } else {
                queryString += `&${keys[i]}=${parameters[keys[i]]}`
            }
        }
    }
    //console.log(queryString);
    return (
        fetch(`https://cors-anywhere.herokuapp.com/${API_BASE_URL + queryString}`, {
            method: 'GET'
        })
        .then(res => res.text())
        .then(data => {
            const wordsArray = data.split('\n');
            const firstWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
            let displayHint = '';
            for (let i = 0; i < firstWord.length; i++) {
                displayHint += '_'
            }
            dispatch(setWord(firstWord, displayHint.trim()));
            dispatch(fetchWordsSuccess(wordsArray));
        })
        .catch(err => {
            dispatch(fetchWordsError(err));
        })
    );
}