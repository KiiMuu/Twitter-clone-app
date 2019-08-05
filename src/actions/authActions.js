import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../constants/Constants';
import setAuthHeader from '../utils/setAuthHeader';


// signup action
export const registerUser = (userData, history) => dispatch => {
    // send user data to server
    // history variable was added to redirect user to specific page if user created successfully
    axios.post('http://localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// login action
export const loginUser = (userData) => dispatch => {
    axios.post('http://localhost:5000/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthHeader(token);
            dispatch(getCurrentUser());
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const getCurrentUser = () => dispatch => {
    axios.get('http://localhost:5000/api/users')
        .then(res => dispatch(setCurrentUser(res.data)));
}

export const setCurrentUser = (data) => {
    return {
        type: SET_CURRENT_USER,
        payload: data
    }
}

// logout action
export const logoutUser = () => dispatch => {
    // after user logged out, remove the token which saved in localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthHeader(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}