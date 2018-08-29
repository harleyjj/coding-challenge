import React, { Component } from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import { connect } from 'react-redux';
import Input from './Input';
import {guessLetter} from '../actions/game';
import {required, nonEmpty, singleLetter} from '../validators';

export class GuessForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notUnique: ''
        }
    }

    onSubmit(values) {
        let{guess} = values;
        guess = guess.toLowerCase();
        if (this.props.guesses.includes(guess)) {
           this.setState({notUnique:'You already guessed that!'}); 
        } else {
            this.props.dispatch(guessLetter(guess));
            this.setState({notUnique: ''});
        }
    }

    

    render() {
        let notUnique;
        if(this.state.notUnique) {
            notUnique = <div className="message not-unique"><strong>{this.state.notUnique}</strong></div>
        }
        return (
            <form
                className="Guess-form"
                onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
                )}>
                <label htmlFor="guess">Guess a letter!</label>
                <Field
                    component={Input}
                    type="text"
                    name="guess"
                    validate={[required, nonEmpty, singleLetter]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Submit Guess
                </button>
                {notUnique}
            </form>
        );
    }
}

const mapStateToProps = state => ({
    guesses: state.game.guesses,
});

GuessForm = reduxForm({
    form: 'guess',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('guess', Object.keys(errors)[0]))
})(GuessForm);

export default connect(mapStateToProps)(GuessForm);