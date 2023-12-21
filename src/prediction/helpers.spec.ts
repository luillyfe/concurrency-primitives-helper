import { cleanJSONString } from './helpers';

describe('cleanJSONString', () => {
  it('should remove all backticks from a string', () => {
    const text = '```{foo: bar}```';
    const expected = '{foo: bar}';
    const actual = cleanJSONString(text);
    expect(actual).toEqual(expected);
  });

  it('should return the original string if it is not valid JSON', () => {
    const text = '{{foo: bar}';
    const expected = text;
    const actual = cleanJSONString(text);
    expect(actual).toEqual(expected);
  });
});
