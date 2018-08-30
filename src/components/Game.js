import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchWords} from '../actions/word';
import Board from './Board';
import StartForm from './StartForm';


class Game extends Component {
    start() {
        this.props.dispatch(fetchWords());
      }

    render() {
        if (this.props.welcome) {
            return (
                <div className="Game">
                    <p className="App-intro">
                        I will choose a secret word, and you can guess letters to find 
                        the word.  If you guess 6 letters that are not in the word, you lose!
                        To get started, click the button below.  Good luck!
                    </p>
                    <StartForm />
                </div>
            );
        }
        return <Board />;
    }
}

const mapStateToProps = state => ({
    welcome: state.game.welcome
});

export default connect(mapStateToProps)(Game);