import React, { Component } from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import LetterForm from './LetterForm';
import WordForm from './WordForm';
import {resetGame, tryAgain} from '../actions/game';
import hangman0 from '../images/hangman0.png';
import hangman1 from '../images/hangman1.png';
import hangman2 from '../images/hangman2.png';
import hangman3 from '../images/hangman3.png';
import hangman4 from '../images/hangman4.png';
import hangman5 from '../images/hangman5.png';
import hangman6 from '../images/hangman6.png';
import win from '../images/win.png'
import './Board.css';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            '1': hangman1,
            '2': hangman2,
            '3': hangman3,
            '4': hangman4,
            '5': hangman5,
            '6': hangman6,
        }
    }
    resetGame() {
        this.props.dispatch(resetGame());
    }

    tryAgain() {
        this.props.dispatch(tryAgain());
    }

    renderBoard() {
        if (this.props.loading) {
            return <Spinner spinnername="circle" fadeIn="none" />;
        }

        if (this.props.error) {
            return <strong className="Error-message">{JSON.stringify(this.props.error)}</strong>;
        }
        if (this.props.won) {
            return (
                <div className="win">
                    <div className="button-part">
                        <button onClick={()=>this.resetGame()}><strong>You win! Click to play again!</strong></button>
                    </div>
                    <div className="win-pic">
                        <img src={win} className="hangman-win" alt="celebrate" />
                    </div>
                </div>
            );
        }
        if (this.props.lost) {
            return (
                <div className="lose">
                    <div className="button-part">
                        <button onClick={()=>this.resetGame()}><strong>You lost! Click to play again!</strong></button>
                    </div>
                    <div className="win-pic">
                        <img src={hangman0} className="hangman-0" alt="hangman" />
                    </div>
                </div>
            );
        }
        if (this.props.words.length > 1) {

            console.log(this.props.guesses);
            let displayGuesses = '';
            for (let i = 0; i < this.props.guesses.length; i++){
                displayGuesses += `${this.props.guesses[i]} `;
                console.log(this.props.guesses[i]);
            }
            console.log(displayGuesses);
            console.log(this.props.notAnswers);
            let wrongAnswers = '';
            for (let i = 0; i < this.props.notAnswers.length; i++){
                wrongAnswers += `${this.props.notAnswers[i]} `;
            }
            console.log(this.props.currentWord);
            console.log(this.props.gameState);
            return (
                <div className="Play">
                    <h1 className="Word">{this.props.displayHint}</h1>
                    <div className="forms">
                        <LetterForm />
                        <WordForm />
                    </div>
                    <div className="indicators">
                        <div className="notice-of-guesses">
                            <strong className="Guesses-left">{`You have ${this.props.guessesRemaining} chances left to guess incorrectly.`}</strong>
                        </div>
                        <div className="image-hangman">
                            <img src={this.state[this.props.guessesRemaining.toString()]} className={`hangman-${this.props.guessesRemaining}`} alt="hangman" />
                        </div>
                    </div>
                    <div className="tallies">
                        <h2>Letters you already guessed: {displayGuesses}</h2>
                        <h2>These are NOT the answers: {wrongAnswers}</h2>
                    </div>
                </div>
            );
        }
        return (
            <div className="App-failed">
                <p><strong className="No-results">Constraints were too strict - try searching again with less restrictions</strong></p>
                <button onClick={()=>this.tryAgain()}><h2>Go Back</h2></button>
            </div>
        );
    }

    render() {
        return (
            <div className="Game">
                {this.renderBoard()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.word.loading,
    error: state.word.error,
    words: state.word.words,
    currentWord: state.game.currentWord,
    guesses: state.game.guesses,
    won: state.game.won,
    lost: state.game.lost,
    displayHint: state.game.displayHint,
    guessesRemaining: state.game.guessesRemaining,
    gameState: state.game,
    notAnswers: state.game.notAnswers,
});

export default connect(mapStateToProps)(Board);