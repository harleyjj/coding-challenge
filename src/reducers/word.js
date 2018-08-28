import {
    FETCH_WORDS_REQUEST,
    FETCH_WORDS_SUCCESS,
    FETCH_WORDS_ERROR
} from '../actions/word';

const initialState = {
    words: '',
    loading: false,
    error: null,
}

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_WORDS_REQUEST) {
        return {
            ...state,
            loading: true
        }
    } else if (action.type === FETCH_WORDS_SUCCESS) {
        return {
            ...state,
            loading: false,
            error: null,
            words: action.words
        }
    } else if (action.type === FETCH_WORDS_ERROR) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
    return state;
}