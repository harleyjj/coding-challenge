export const START_GAME = 'START_GAME ';
export const startGame = () => ({
    type: START_GAME
});

export const GUESS_LETTER = 'GUESS_LETTER';
export const guessLetter = guess => ({
    type: GUESS_LETTER,
    guess
});