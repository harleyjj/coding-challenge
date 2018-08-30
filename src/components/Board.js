import React, { Component } from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import LetterForm from './LetterForm';
import WordForm from './WordForm';
import {resetGame, tryAgain} from '../actions/game';


class Board extends Component {
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
            return <button onClick={()=>this.resetGame()}><strong>You win! Click to play again!</strong></button>
        }
        if (this.props.lost) {
            return <button onClick={()=>this.resetGame()}><strong>You lost! Click to play again!</strong></button>
        }
        if (this.props.words.length > 1) {
            console.log(this.props.guesses);
            const displayGuesses = this.props.guesses.map((g, index) => {
                return <li key={g}>{g}</li>
            })
            console.log(this.props.notAnswers);
            const wrongAnswers = this.props.notAnswers.map((w, index) => {
                return <li key={w}>{w}</li>
            })
            console.log(this.props.currentWord);
            console.log(this.props.gameState);
            return (
                <div className="Play">
                    <strong className="Word">{this.props.displayHint}</strong>
                    <LetterForm />
                    <WordForm />
                    <strong className="Guesses-left">{`You have ${this.props.guessesRemaining} chances left to guess incorrectly.`}</strong>
                    <h2>Letters you already guessed:</h2>
                    <ul>{displayGuesses}</ul>
                    <h2>These are NOT the answers:</h2>
                    <ul>{wrongAnswers}</ul>
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