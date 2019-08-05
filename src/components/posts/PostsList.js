import React, { Component } from 'react'
import AddPost from './AddPost';
import Post from './Post';
import LoadingPosts from './LoadingPosts';
import './Posts.scss';
import { connect } from 'react-redux';
import { getPosts, getPostsByFollowingUsers } from '../../actions/postActions';

class PostsList extends Component {

    state = {
        allPosts: true
    }

    handleChange = (e) => {
        this.setState({
            allPosts: e.target.checked
        });
    }

    componentDidMount() {
        this.props.getPosts();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.allPosts !== this.state.allPosts) {
            this.state.allPosts ? this.props.getPosts() : this.props.getPostsByFollowingUsers()
        }
    }

    render() {
        const { list, loading } = this.props;
        const { allPosts } = this.state

        const items = list && list.map(item => <Post key={item._id} post={item} />);
        return (
            <div className="posts-list">
                <div className="uk-container uk-container-small">
                    <AddPost />
                    <label class="switch">
                        <input type="checkbox" checked={allPosts} onChange={this.handleChange} />
                        <span className="slider round"></span>
                    </label>
                    <span>{allPosts ? <p>All posts</p> : <p>Posts from following users</p>}</span>
                    { loading ? <LoadingPosts /> : items }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.post.list,
    loading: state.post.loading
});

export default connect(mapStateToProps, { getPosts, getPostsByFollowingUsers })(PostsList);