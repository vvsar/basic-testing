// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = {
      value: 'I',
      next: {
        value: 'want',
        next: {
          value: 258,
          next: {
            value: 'points',
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };
    expect(generateLinkedList(['I', 'want', 258, 'points'])).toStrictEqual(
      linkedList,
    );
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(['I', 'want', 258, 'points'])).toMatchSnapshot();
  });
});
