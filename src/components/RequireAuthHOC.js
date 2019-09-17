import React, { Component } from 'react';

export default ChildComponent => {
  class WrappedComponent extends Component {
    render() {
      return <ChildComponent />;
    }
  }

  return WrappedComponent;
};
