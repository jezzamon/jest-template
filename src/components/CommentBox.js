import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      <form onSubmit={this.handleSubmit}>
        <h4>Add a comment</h4>
        <textarea onChange={this.handleChange} value={this.state.comment} />
        <div>
          <button>Submit Comment</button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  actions
)(CommentBox);
