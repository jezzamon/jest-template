import React from 'react';
import { mount } from 'enzyme';
import CommentBox from '../CommentBox';
import Root from 'Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has a text area and two buttons', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {
  beforeEach(() => {
    // find the textarea element
    wrapped
      .find('textarea')
      // provide a fake event object with simulate (in this case,  react evt 'onChange' will be regular js event 'change')
      .simulate('change', {
        target: { value: 'new comment' },
      });
    // force a component update after change (works around setState async to force update immediately)
    wrapped.update();
  });

  it('has a text area that users can type in', () => {
    // assert the text area value has changed
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('when form is submitted, textarea gets emptied', () => {
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual(undefined);
  });
});
