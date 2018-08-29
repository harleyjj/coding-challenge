import {
    START_GAME,
    GUESS_LETTER,
    SET_WORD,
} from '../actions/game';

const initialState = {
    welcome: true,
    guesses: [],
    currentWord: '',
}

export default function reducer(state = initialState, action) {
    if (action.type === START_GAME) {
        return {
            ...state,
            welcome: false
        }
    } else if (action.type === GUESS_LETTER) {
        return {
            ...state,
            guesses: [...state.guesses, action.guess]
        }
    } else if (action.type === SET_WORD) {
        return {
            ...state,
            currentWord: action.word
        }
    }
    return state;
}