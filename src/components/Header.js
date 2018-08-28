import React from 'react';
import {connect} from 'react-redux';
import logo from '../logo.svg';

export function Header(props) {
    if (props.welcome) {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React Hangman</h1>
            </header>
        );
    }
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Let's Play React Hangman</h1>
        </header>
    );
}

const mapStateToProps = state => ({
    welcome: state.game.welcome
});

export default connect(mapStateToProps)(Header);