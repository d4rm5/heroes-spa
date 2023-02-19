import { authReducer } from '../../../auth/context/authReducer';
import { types } from '../../../auth/types/types';

describe('Tests in authReducer', () => {
  const initialState = {
    logged: false,
    user: null,
  };
  const user = {
    id: 'ABC',
    name: 'Pedro',
  };
  test('should return initial state', () => {
    const newState = authReducer(initialState, {});
    expect(newState).toBe(initialState);
  });
  test('should call login, authenticate and establish user', () => {
    const action = {
      type: types.login,
      payload: user,
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      logged: true,
      user,
    });
  });
  test('should call logout, authenticate and delete user', () => {
    const state = {
      logged: true,
      user: { id: 'ABC', name: 'Pedro' },
    };
    const action = {
      type: types.logout,
    };
    const newState = authReducer(state, action);
    expect(newState).toEqual({
      logged: false,
    });
  });
});
