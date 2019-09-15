import comment from '../comments';
import { SAVE_COMMENT } from 'actions/types';

it('handles actions of type SAVE_COMMENT', () => {
  const action = {
    type: SAVE_COMMENT,
    payload: 'new comment',
  };

  const newState = comment([], action);

  expect(newState).toEqual(['new comment']);
});

it('handles actions with unknown type', () => {
  const newState = comment([], { type: 'unknown blah blah' });

  expect(newState).toEqual([]);
});
