import React, { Component } from 'react';
import {connect} from 'react-redux';
import {guessLetter} from '../actions/game';
import Spinner from 'react-spinkit';


class Board extends Component {
    guess() {
        this.props.dispatch(guessLetter());
      }

    renderBoard() {
        if (this.props.loading) {
            return <Spinner spinnername="circle" fadeIn="none" />;
        }

        if (this.props.error) {
            return <strong className="Error-message">{JSON.stringify(this.props.error)}</strong>;
        }
        if (this.props.words.length > 0) {
            return <strong className="Word">{this.props.currentWord}</strong>
        }
        return <p className="App-failed">No Results</p>
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
});

export default connect(mapStateToProps)(Board);