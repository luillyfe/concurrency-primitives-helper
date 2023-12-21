import { cleanJSONString } from './dataFormatting';

describe('cleanJSONString', () => {
  it('should remove all backticks from a string', () => {
    const text = '```{"foo": "bar"}```';
    const expected = JSON.parse('{"foo": "bar"}');
    const actual = cleanJSONString(text);
    expect(actual).toEqual(expected);
  });

  it('should return the original string if it is not valid JSON', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    const text = '{{"foo": "bar"}';
    const actual = cleanJSONString(text);
    expect(actual).toEqual(text);
  });
});
