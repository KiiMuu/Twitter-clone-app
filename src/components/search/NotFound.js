import React from 'react';
import '../notfoundpage/404.scss';
import vol from '../../imgs/voldemort.jpg';

const NotFound = () => {
    return (
        <div className="not-found uk-text-center">
            <div className="uk-container uk-container-small">
                <div className="content">
                    <h3>User not found</h3>
                    <img src={vol} alt="Voldy" draggable="false" />
                </div>
            </div>
        </div>
    )
}

export default NotFound;