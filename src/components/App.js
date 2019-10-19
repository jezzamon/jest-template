import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';

import * as actions from 'actions';

class App extends React.Component {
  renderButton() {
    if (this.props.auth) {
      return (
        <button onClick={() => this.props.changeAuth(false)}>Sign Out</button>
      );
    } else {
      return (
        <button onClick={() => this.props.changeAuth(true)}>Sign In</button>
      );
    }
  }

  renderHeader() {
    return (
      <ul>
        <li>{this.renderButton()}</li>
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.renderHeader()}
        {this.props.children}
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
)(App);
