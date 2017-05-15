import { LocationHellPage } from './app.po';

describe('location-hell App', () => {
  let page: LocationHellPage;

  beforeEach(() => {
    page = new LocationHellPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
