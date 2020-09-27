import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

// import components
import Main from './components/layout/Main';
import Home from './components/home/Home';
import Footer from './components/layout/Footer';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import Profile from './components/profile/Profile';
import it404 from './components/notfoundpage/404';
import Search from './components/search/NotFound';

import setAuthHeader from './utils/setAuthHeader';
import { logoutUser, getCurrentUser } from './actions/authActions';


if(localStorage.getItem('jwtToken')) {
	const currentTime = Date.now() / 1000;
	const decode = jwt_decode(localStorage.getItem('jwtToken'));
	if(currentTime > decode.exp) {
		// if token expires, I'll fire logout action to remove token from localStorage
		// logout user function run with the dispatch function
		store.dispatch(logoutUser());
		window.location.href = "./login";
	} else {
		// add token to header
		setAuthHeader(localStorage.getItem('jwtToken'));
		// if token not expired yet, then run getCurrentUser action to get user data
		store.dispatch(getCurrentUser());
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<BrowserRouter>
						<Main />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/register" component={Register} />
							<Route path="/login" component={Login} />
							<Route path="/profile/:userId" component={Profile} />
							<Route path="/search" component={Search} />
							<Route component={it404} />
						</Switch>
						<Footer />
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}

export default App;
