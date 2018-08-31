import {
    START_GAME,
    GUESS_LETTER,
    GUESS_WORD,
    SET_WORD,
    WIN_GAME,
    LOSE_GAME,
    NEW_GAME,
    TRY_AGAIN
} from '../actions/game';

const initialState = {
    welcome: true,
    guesses: [],
    currentWord: '',
    lost: false,
    won: false,
    displayHint: '',
    guessesRemaining: 6,
    notAnswers: [],
    wins: 0,
    losses: 0,
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
            guesses: [...state.guesses, action.guess],
            displayHint: action.displayHint,
            guessesRemaining: action.guessesRemaining,
        }
    } else if (action.type === GUESS_WORD) {
        return {
            ...state,
            notAnswers: [...state.notAnswers, action.guess],
            guessesRemaining: action.guessesRemaining,
        }
    } else if (action.type === SET_WORD) {
        return {
            ...state,
            currentWord: action.word,
            displayHint: action.displayHint,
        }
    } else if (action.type === LOSE_GAME) {
        return {
            ...state,
            lost: true,
            losses: state.losses + 1,
        }
    } else if (action.type === WIN_GAME) {
        return {
            ...state,
            won: true,
            wins: state.wins + 1,
        }
    } else if (action.type === NEW_GAME) {
        return {
            ...state,
            guesses: [],
            lost: false,
            won: false,
            guessesRemaining: 6,
            notAnswers: [],
        }
    } else if (action.type === TRY_AGAIN) {
        return {
            ...state,
            welcome: true,
            guesses: [],
            currentWord: '',
            lost: false,
            won: false,
            displayHint: '',
            guessesRemaining: 6,
            notAnswers: [],
        }
    }
    return state;
}