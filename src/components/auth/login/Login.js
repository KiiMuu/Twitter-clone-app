import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../actions/authActions';
import PropTypes from 'prop-types';
import InlineError from '../inline-form-errors/InlineErrors';
import '../register/Register.scss';

class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    }

    // user who logged in cannot go to login route
    componentDidMount() {
        // if user logged in, redirect him to homepage
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        // user who logged in cannot go to login route
        if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
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
            password: this.state.password,
        };

        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="uk-container uk-container-small">
                    <h3 className="uk-text-uppercase uk-text-center">Sign in</h3>
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
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            { errors.password && <InlineError text={errors.password} /> }
                        </div>
                        <div className="uk-width-1-2@m uk-text-left">
                            <button type="submit" className="uk-button uk-button-default">Sign in</button>
                        </div>
                        <div className="uk-width-1-2@m uk-text-right register-option">
                            <Link to="/register">haven't an account? Signup</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { loginUser })(withRouter(Login));