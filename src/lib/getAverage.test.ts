import { getAverage } from './getAverage';

describe('getAverage', () => {
  test('It calculates an average', () => {
    expect(getAverage([1, 2, 3])).toEqual(2);
    expect(getAverage([1, 2, 3, 4])).toEqual(2.5);
  });

  test('It returns only 1 decimal place', () => {
    expect(getAverage([1.333333])).toEqual(1.3);
  });

  test('It rounds up when it should', () => {
    expect(getAverage([1.86])).toEqual(1.9);
  });

  test('It rounds down when it should', () => {
    expect(getAverage([1.84])).toEqual(1.8);
  });

  test('It returns 0 if passed an empty array', () => {
    expect(getAverage([])).toEqual(0);
  });
});
