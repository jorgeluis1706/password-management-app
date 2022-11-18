import { FilterPasswordsPipe } from './filter-passwords.pipe';

describe('FilterPasswordsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPasswordsPipe();
    expect(pipe).toBeTruthy();
  });
});
