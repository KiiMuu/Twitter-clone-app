import React, { Component } from 'react';
// wrap component so you can use the history
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { registerUser } from '../../../actions/authActions';
import InlineError from '../inline-form-errors/InlineErrors';
import './Register.scss';

class Register extends Component {

    state = {
        email: '',
        username: '',
        password: '',
        password2: '',
        errors: {}
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(userData, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="uk-container uk-container-small">
                    <h3 className="uk-text-uppercase uk-text-center">Sign up</h3>
                    <form className="uk-grid-small" data-uk-grid onSubmit={this.handleSubmit}>
                        <div className="uk-width-1-2@m">
                            <input 
                                className="uk-input" 
                                type="email"
                                name="email" 
                                placeholder="Eamil"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            { errors.email && <InlineError text={errors.email} /> }
                        </div>
                        <div className="uk-width-1-2@m">
                            <input 
                                className="uk-input" 
                                type="text"
                                name="username" 
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                             />
                             { errors.username && <InlineError text={errors.username} /> }
                        </div>
                        <div className="uk-width-1-2@m">
                            <input 
                                className="uk-input" 
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            { errors.password && <InlineError text={errors.password} /> }
                        </div>
                        <div className="uk-width-1-2@m">
                            <input 
                                className="uk-input" 
                                type="password"
                                name="password2"
                                placeholder="Confirm Password"
                                value={this.state.password2}
                                onChange={this.handleChange}
                            />
                            { errors.password2 && <InlineError text={errors.password2} /> }
                        </div>
                        <div className="uk-width-1-2@m uk-text-left">
                            <button type="submit" className="uk-button uk-button-default">Register</button>
                        </div>
                        <div className="uk-width-1-2@m uk-text-right login-option">
                            <Link to="/login">have an account? Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors
});

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));