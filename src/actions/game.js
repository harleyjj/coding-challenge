export const START_GAME = 'START_GAME';
export const startGame = () => ({
    type: START_GAME
});

export const TRY_AGAIN = 'TRY_AGAIN';
export const tryAgain = () => ({
    type: TRY_AGAIN
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

export const GUESS_WORD = 'GUESS_WORD';
export const guessWord = (guess, guessesRemaining) => ({
    type: GUESS_WORD,
    guess,
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
    let missing = false;
    const currentWord = getState().game.currentWord;
    let guessesRemaining = getState().game.guessesRemaining;
    const guesses = [...getState().game.guesses, guess];
    for(let i = 0; i < currentWord.length; i++){
        if(guesses.includes(currentWord[i])) {
            displayHint += `${currentWord[i]} `;
        } else {
            displayHint += '_ ';
            missing = true;
        }
    }
    if (!missing) {
        dispatch(winGame());
        return;
    }
    if(!displayHint.includes(guess)){
        guessesRemaining -= 1;
    }
    if (guessesRemaining < 1) {
        dispatch(loseGame());
        return;
    }
    dispatch(guessLetter(guess, displayHint.trim(), guessesRemaining));
}

export const guessAnswer = guess => (dispatch, getState) => {
    const currentWord = getState().game.currentWord;
    if (currentWord === guess) {
        dispatch(winGame());
        return;
    }
    let guessesRemaining = getState().game.guessesRemaining - 1;
    if (guessesRemaining < 1) {
        dispatch(loseGame());
        return;
    }
    dispatch(guessWord(guess, guessesRemaining));
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