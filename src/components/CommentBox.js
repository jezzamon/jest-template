import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class CommentBox extends Component {
  state = { comment: '' };

  // our component just got rendered
  componentDidMount() {
    this.shouldNavigateAway();
  }

  componentDidUpdate() {
    this.shouldNavigateAway();
  }

  shouldNavigateAway() {
    if (!this.props.auth) {
      console.log('i need to leave');
      this.props.history.push('/');
    }
  }

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

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(
  mapStateToProps,
  actions
)(CommentBox);
