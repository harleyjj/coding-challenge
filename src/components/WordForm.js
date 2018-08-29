import React, { Component } from 'react';
import {Field, reduxForm, focus, reset} from 'redux-form';
import { connect } from 'react-redux';
import Input from './Input';
import {guessAnswer} from '../actions/game';
import {required, nonEmpty, noSpaces} from '../validators';

export class WordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notUnique: ''
        }
    }

    onSubmit(values) {
        let{guess} = values;
        guess = guess.toLowerCase();
        if (this.props.notAnswers.includes(guess)) {
           this.setState({notUnique:'You already guessed that!'}); 
        } else {
            this.props.dispatch(guessAnswer(guess));
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
                className="Word-form"
                onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
                )}>
                <label htmlFor="guess">Think you know the solution?</label>
                <Field
                    component={Input}
                    type="text"
                    name="guess"
                    validate={[required, nonEmpty, noSpaces]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Guess the Answer
                </button>
                {notUnique}
            </form>
        );
    }
}

const mapStateToProps = state => ({
    notAnswers: state.game.notAnswers,
});

const afterSubmit = (result, dispatch) =>
    dispatch(reset('word'));

WordForm = reduxForm({
    form: 'word',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('word', Object.keys(errors)[0])),
    onSubmitSuccess: afterSubmit,
})(WordForm);

export default connect(mapStateToProps)(WordForm);