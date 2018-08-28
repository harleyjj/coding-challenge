import {
    START_GAME,
    GUESS_LETTER
} from '../actions/game';

const initialState = {
    welcome: true,
    guesses: []
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
    }
    return state;
}