import React, { Component } from 'react';
import {Field, reduxForm, focus, reset} from 'redux-form';
import { connect } from 'react-redux';
import Input from './Input';
import {makeGuess} from '../actions/game';
import {required, singleLetter} from '../validators';

export class LetterForm extends Component {
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
            this.props.dispatch(makeGuess(guess));
            this.setState({notUnique: ''});
        }
    }

    

    render() {
        return (
            <form
                className="Letter-form"
                onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
                )}>
                <Field
                    component={Input}
                    type="text"
                    name="guess"
                    label="Guess a letter!"
                    validate={[required, singleLetter]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Submit Letter Guess
                </button>
                <div className="message not-unique"><strong>{this.state.notUnique ? this.state.notUnique : 'You can do it!'}</strong></div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    guesses: state.game.guesses,
});

const afterSubmit = (result, dispatch) =>
    dispatch(reset('letter'));

LetterForm = reduxForm({
    form: 'letter',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('letter', Object.keys(errors)[0])),
    onSubmitSuccess: afterSubmit,
})(LetterForm);

export default connect(mapStateToProps)(LetterForm);