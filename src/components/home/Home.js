import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostsList from '../posts/PostsList';
import Login from '../auth/login/Login';

class Home extends Component {
    render() {
        const { isAuthenticated } = this.props;
        return (
            <div className="homepage">
                <div className="uk-container">
                    { isAuthenticated ? <PostsList /> : <Login /> }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);