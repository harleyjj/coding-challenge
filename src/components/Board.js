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
            const currentWord = this.props.words[Math.floor(Math.random() * this.props.words.length)];
            return <strong className="Word">{currentWord}</strong>
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
});

export default connect(mapStateToProps)(Board);