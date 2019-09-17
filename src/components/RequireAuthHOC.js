import React, { Component } from 'react';
import { connect } from 'react-redux';

const RequireAuthHOC = (ChildComponent) => {
  class WrappedComponent extends Component {
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

    render() {
      return <ChildComponent />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }

  return connect(mapStateToProps)(WrappedComponent);
};

export default RequireAuthHOC;
