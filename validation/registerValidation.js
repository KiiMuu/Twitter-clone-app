const Validator = require('validator');

module.exports = function(data) {
    let errors = {};

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }
    
    if(Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if(!Validator.isLength(data.username, { min: 4, max: 30 })) {
        errors.username = 'Username must be between 4 and 30 characters'
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 and 30 characters'
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password must match'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}