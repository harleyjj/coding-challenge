import React, { Component } from 'react';
import {Field, reduxForm, focus, reset} from 'redux-form';
import Input from './Input';
import {fetchWords} from '../actions/word';
import {positiveInteger} from '../validators';
import './StartForm.css';

export class StartForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minMax: ''
        }
    }

    onSubmit(values) {
        console.log(values);
        let {minLength, maxLength} = values;
        if(minLength && maxLength) {
            if (maxLength < minLength) {
                this.setState({minMax: 'The maximum number of letters must be greater than or equal to the minimum length'});
            } else {
                this.props.dispatch(fetchWords(values));
                this.setState({minMax: ''});
            }
        } else {
            this.props.dispatch(fetchWords(values));
            this.setState({minMax: ''});
        }
    }

    render() {
        let minMax;
        if(this.state.minMax) {
            minMax = <div className="message min-max"><strong>{this.state.minMax}</strong></div>
        }
        return (
            <form
                className="Start-form"
                onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
                )}>
                <div className="form-input">
                <label htmlFor="difficulty">Choose level of difficulty (Optional)</label>
                    <Field component="select" name="difficulty">
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </Field>
                </div>
                <Field
                    component={Input}
                    type="text"
                    name="minLength"
                    label="Choose a minimum number of letters (Optional)"
                    validate={[positiveInteger]}
                />
                <Field
                    component={Input}
                    type="text"
                    name="maxLength"
                    label="Choose a maximum number of letters (Optional)"
                    validate={[positiveInteger]}
                />
                <button
                    type="submit"
                    disabled={this.props.submitting}>
                    <h2>Start Game!</h2>
                </button>
                {minMax}
            </form>
        );
    }
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('start'));

export default reduxForm({
    form: 'word',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('word', Object.keys(errors)[0])),
    onSubmitSuccess: afterSubmit,
})(StartForm);