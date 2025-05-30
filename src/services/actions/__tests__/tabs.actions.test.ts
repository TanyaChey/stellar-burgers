import * as actions from '../../actions/tabs';

describe('tabs actions', () => {
  test('setActiveTab returns correct action', () => {
    const tab = 'ingredients';
    expect(actions.setActiveTab(tab)).toEqual({
      type: actions.setActiveTab,
      payload: tab,
    });
  });
});
