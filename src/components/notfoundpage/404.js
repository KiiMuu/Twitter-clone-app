import React from 'react';
import './404.scss';
import { Link } from 'react-router-dom';

const it404 = () => {
    return (
        <div className="not-found uk-text-center">
            <div className="uk-container">
                <div className="content">
                    <h1>404!</h1>
                    <p>Page not found :(</p>
                </div>
                <Link to="/">Back to home?</Link>
            </div>
        </div>
    )
}

export default it404;
