import React from 'react';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        //console.log(this.props.value);
        

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>
                    <strong>   
                        {(this.props.meta.touched && this.props.meta.error) ? this.props.meta.error : this.props.label}
                    </strong>
                </label>
                <div>
                    <input
                        {...this.props.input}
                        id={this.props.input.name}
                        type={this.props.type}
                        ref={input => (this.input = input)}
                    />
                </div>
            </div>
        );
    }
}