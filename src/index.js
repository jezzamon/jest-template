import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './Root';
import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';
import Welcome from './components/Welcome';
import Signup from 'components/auth/Signup';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App>
        {/* <Route path="/" */}
        <Route path="/" exact component={Welcome} />
        <Route path="/post" component={CommentBox} />
        <Route path="/comments" exact component={CommentList} />
        <Route path="/signup" component={Signup} />
      </App>
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
);
