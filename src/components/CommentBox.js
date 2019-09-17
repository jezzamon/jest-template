import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from './RequireAuthHOC';
import * as actions from 'actions';


class CommentBox extends Component {
  state = { comment: '' };

  handleChange = evt => {
    this.setState({ comment: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.saveComment(this.state.comment);
    console.log('clicked');

    this.setState({ comment: evt.target.value });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>Add a comment</h4>
          <textarea onChange={this.handleChange} value={this.state.comment} />
          <div>
            <button>Submit Comment</button>
          </div>
        </form>
        <button className="fetch-comments" onClick={this.props.fetchComments}>
          Fetch comments
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(requireAuth(CommentBox));
