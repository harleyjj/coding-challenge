export const START_GAME = 'START_GAME';
export const startGame = () => ({
    type: START_GAME
});

export const NEW_GAME = 'NEW_GAME';
export const newGame = () => ({
    type: NEW_GAME
});


export const GUESS_LETTER = 'GUESS_LETTER';
export const guessLetter = (guess, displayHint, guessesRemaining) => ({
    type: GUESS_LETTER,
    guess,
    displayHint,
    guessesRemaining,
});

export const SET_WORD = 'SET_WORD';
export const setWord = (word, displayHint) => ({
    type: SET_WORD,
    word,
    displayHint,
});

export const LOSE_GAME = 'LOSE_GAME';
export const loseGame = () => ({
    type: LOSE_GAME
});

export const WIN_GAME = 'WIN_GAME';
export const winGame = () => ({
    type: WIN_GAME
});

export const makeGuess = guess => (dispatch, getState) => {
    let displayHint = '';
    let goodGuesses = {};
    let missing = false;
    const currentWord = getState().game.currentWord;
    const guesses = [...getState().game.guesses, guess];
    for(let i = 0; i < currentWord.length; i++){
        if(guesses.includes(currentWord[i])) {
            displayHint += `${currentWord[i]} `;
            goodGuesses[currentWord[i]] = 1;
        } else {
            displayHint += '_ ';
            missing = true;
        }
    }
    if (!missing) {
        dispatch(winGame());
        return;
    }
    let guessesRemaining = 6 - (guesses.length - Object.keys(goodGuesses).length);
    if (guessesRemaining < 1) {
        dispatch(loseGame());
        return;
    }
    dispatch(guessLetter(guess, displayHint.trim(), guessesRemaining));
}

export const resetGame = () => (dispatch, getState) => {
    const wordsArray = getState().word.words;
    const newWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    let displayHint = '';
    for (let i = 0; i < newWord.length; i++) {
        displayHint += '_ '
    }
    dispatch(setWord(newWord, displayHint.trim()))
    dispatch(newGame());
}