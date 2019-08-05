import React, { Component } from 'react';
import './Posts.scss';
import { Link } from 'react-router-dom';

class Post extends Component {
    render() {
        const { post } = this.props;
        return (
            <div className="post">
                <div className="uk-container uk-container-small">
                    <article className="uk-comment uk-comment-primary uk-margin-small-bottom uk-box-shadow-medium">
                        <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
                            <div 
                                className="uk-width-auto"
                                style={{ 
                                    backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}`
                            }}>
                                <img className="uk-comment-avatar" src="images/avatar.jpg" width="80" height="80" alt="" />
                            </div>
                            <div className="uk-width-expand">
                                <h4 className="uk-comment-title">
                                    <Link to={`/profile/${post.user.id}`} className="uk-link-reset">{post.user.username}</Link>
                                </h4>
                                <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                    <li><span>{(new Date(post.createdAt)).toLocaleString()}</span></li>
                                </ul>
                            </div>
                        </header>
                        <div className="uk-comment-body">
                            <p>{post.text}</p>
                        </div>
                    </article>
                </div>
            </div>
        )
    }
}

export default Post;