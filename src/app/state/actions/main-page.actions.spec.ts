import * as fromMainPage from './main-page.actions';

describe('loadMainPages', () => {
  it('should return an action', () => {
    expect(fromMainPage.loadMainPages().type).toBe('[MainPage] Load MainPages');
  });
});
