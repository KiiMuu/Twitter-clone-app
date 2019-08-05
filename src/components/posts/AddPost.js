import React, { Component } from 'react';
import './Posts.scss';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

class AddPost extends Component {

    state = {
        text: ''
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            text: this.state.text
        }

        this.props.addPost(postData);
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <div className="add-post">
                <div className="uk-container uk-container-small">
                    <form>
                        <div className="uk-margin uk-box-shadow-medium">
                            <textarea 
                                className="uk-textarea" 
                                rows="4" 
                                placeholder="What's happening" 
                                onChange={this.handleChange}
                                value={this.state.text}
                            ></textarea>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                className="uk-button uk-button-default uk-text-capitalize"
                                onClick={this.handleSubmit}
                            >Tweet</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, { addPost })(AddPost);