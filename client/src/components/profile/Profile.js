import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.scss';
import { 
    getPostsByUserId, 
    getUserProfile,
    followUser,
    unfollowUser,
    refreshUserProfile
} from '../../actions/profileActions';
import Post from '../posts/Post';
import LoadingPosts from '../posts/LoadingPosts';

class Profile extends Component {

    componentDidMount() {
        this.props.getPostsByUserId(this.props.match.params.userId);
        this.props.getUserProfile(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps) {
        if(this.props.auth.isAuthenticated) {
            if(prevProps.user && prevProps.user.following !== this.props.user.following) {
                this.props.refreshUserProfile(this.props.match.params.userId);
            }
        }
    }

    handleFollow = () => {
        this.props.followUser(this.props.match.params.userId);
    }

    handleUnfollow = () => {
        this.props.unfollowUser(this.props.match.params.userId);
    }

    render() {
        const { 
            loadingPosts, 
            loadingProfile,
            list, 
            auth, 
            user,
            profile
        } = this.props;

        let followBtns;
        // if user logged in, show follow button
        if(auth.isAuthenticated) {
            // if user don't follow this profile, show follow button
            if(user && user.following &&  user.following.indexOf(this.props.match.params.userId) === -1) {
                followBtns = (
                    <div>
                        <button onClick={this.handleFollow}>Follow</button>
                    </div>
                );   
            } else {
                followBtns = (
                    <div>
                        <button onClick={this.handleUnfollow}>Unfollow</button>
                    </div>
                );  
            }
        }

        let items = list && list.map(item => <Post key={item._id} post={item} />);
        let profileInfo
        // if profile and items are not null, find user inforamtion
        if(profile && items) {
            profileInfo = (
                <div className="profile-info uk-container uk-container-small">
                    <h2>Hello, {profile.username}</h2>
                    <div className="user-email">{profile.email}</div>
                    <div className="uk-child-width-1-2 uk-child-width-1-4@s" data-uk-grid>
                        <div>
                            <span>{items.length} posts</span>
                        </div>
                        <div>
                            <span>{profile.followers.length} followers</span>
                        </div>
                        <div>
                            <span>{profile.following.length} following</span>
                        </div>
                        <div>
                            {followBtns}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="profile">
                <div className="uk-container uk-container-small">
                    { loadingProfile ? <div className="uk-text-center" style={{color: '#F3F3F3'}}>Loading</div> : profileInfo }
                    { loadingPosts ? <LoadingPosts /> : items }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loadingPosts: state.post.loading,
	list: state.post.list,
	profile: state.profile.user,
	loadingProfile: state.profile.loading,
	auth: state.auth,
	user: state.auth.user
});

export default connect(mapStateToProps, { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile })(Profile);
