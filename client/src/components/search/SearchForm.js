import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchUsers } from '../../actions/profileActions';

class SearchForm extends Component {

    handleSubmit = (e) => {
        const searchData = {
            text: e.target.value
        }
        if(e.key === 'Enter') {
            e.preventDefault();
            this.props.searchUsers(searchData, this.props.history);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="nav-overlay uk-navbar-center">
                    <i className="uk-navbar-toggle fa fa-search" uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top-small"></i>
                </div>
                <div className="nav-overlay uk-navbar-left uk-flex-1" hidden>
                    <div className="uk-navbar-item uk-width-expand">
                        <form className="uk-search uk-search-navbar uk-width-1-1">
                            <input 
                                className="uk-search-input" 
                                type="search" 
                                placeholder="Search users..."
                                onKeyPress={this.handleSubmit}
                                autofocus="true"
                            />
                        </form>
                    </div>
                    <span className="uk-navbar-toggle" data-uk-close uk-toggle="target: .nav-overlay; animation: uk-animation-slide-bottom-small"></span>
                </div>
            </React.Fragment>
        )
    }
}



export default connect(null, { searchUsers })(withRouter(SearchForm));