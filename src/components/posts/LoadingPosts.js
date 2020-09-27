import React from 'react';
import './Posts.scss';

const LoadingPosts = () => {
    return (
        <div className="loading-posts">
            <div className="uk-container">
                <div style={{color: '#F3F3F3'}}>Loadin posts...</div>
            </div>
        </div>
    )
}

export default LoadingPosts;