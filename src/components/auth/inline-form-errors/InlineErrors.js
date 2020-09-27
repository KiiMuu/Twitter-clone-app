import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessagesStyle.scss';

const InlineError = ({text}) => {
    return (
        <div className="uk-alert-danger" data-uk-alert>
            <p>{text}</p>
        </div>
    );
};

InlineError.propTypes = {
    text: PropTypes.string.isRequired
};

export default InlineError;