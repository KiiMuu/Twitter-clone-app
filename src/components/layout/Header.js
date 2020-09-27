import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Layout.scss';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import SearchForm from '../search/SearchForm';

class Header extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

	handleLogout () {
		this.props.logoutUser();
	}

    render() {
        const { isAuthenticated, user } = this.props;
        
        const guestLinks = (
            <div className="nav-overlay uk-navbar-right">
                <div className="uk-inline">
                    <i className="fa fa-ellipsis-v icon"></i>
                    <div data-uk-dropdown="mode: click; animation: uk-animation-slide-top-small">
                        <ul className="uk-nav uk-dropdown-nav">
                            <li>
                                <Link to="/login"><i className="fa fa-sign-in"></i> Login</Link>
                            </li>
                            <li>
                                <Link to="/register"><i className="fa fa-user-plus"></i> Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );

        const authLinks = isAuthenticated && (
            <React.Fragment>
                <SearchForm />
                <div className="nav-overlay uk-navbar-right">
                    <div className="uk-inline">
                        <i className="fa fa-ellipsis-v icon"></i>
                        <div data-uk-dropdown="mode: click; animation: uk-animation-slide-top-small">
                            <ul className="uk-nav uk-dropdown-nav">
                                <li>
                                    <Link to={`/profile/${user._id}`}><i className="fa fa-user"></i> Profile</Link>
                                </li>
                                <li>
                                    <Link to="/#" onClick={this.handleLogout}><i className="fa fa-sign-out"></i> Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
        return (
            <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
                <div className="navbar">
                    <div className="navbar-content">
                        <div>
                            <nav className="uk-margin uk-container" data-uk-navbar>
                                <div className="nav-overlay uk-navbar-left">
                                    <Link to="/" className="uk-navbar-item uk-logo">Javascript</Link>
                                </div>
                                { isAuthenticated ? authLinks : guestLinks }
                            </nav>
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { logoutUser })(Header);