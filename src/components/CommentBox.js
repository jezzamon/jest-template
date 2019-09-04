import React, { Component } from 'react';

class CommentBox extends Component {
  state = { comment: '' };

  handleChange = evt => {
    this.setState({ comment: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.setState({ comment: '' });
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

export default CommentBox;
