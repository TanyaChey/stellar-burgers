import { userReducer } from '../reducers/user';
import * as types from '../types/user';

describe('userReducer', () => {
  it('обрабатывает START_LOGIN', () => {
    const result = userReducer(undefined, { type: types.START_LOGIN });
    expect(result.isRequestingLogin).toBe(true);
  });

  it('обрабатывает LOGIN_SUCCESS', () => {
    const payload = {
      name: 'Test User',
      email: 'test@test.com',
      // Добавь другие обязательные поля IUser, если есть
    };
    const result = userReducer(undefined, { type: types.LOGIN_SUCCESS, payload });
    expect(result.information).toEqual(payload);
  });

  it('обрабатывает LOGOUT_SUCCESS', () => {
    const state = { ...userReducer(undefined, {} as any), information: { name: 'a', email: 'a@example.com' } };
    const result = userReducer(state, { type: types.LOGOUT_SUCCESS });
    expect(result.information).toBeNull();
  });
});