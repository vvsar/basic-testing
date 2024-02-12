// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { doStuffByTimeout } from '.';

describe('doStuffByTimeout', () => {
  const callback = jest.fn();

  test('should set timeout with provided callback and timeout', () => {
    // doStuffByTimeout(callback, 1000);
    // expect(callback).toHaveBeenCalledTimes(1);
    // expect(callback).toHaveBeenLastCalledWith(expect(callback), 1000);
  });

  test('should call callback only after timeout', () => {
    jest.useFakeTimers();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
  });
});

describe('readFileAsynchronously', () => {
  // const mockedPath = path as jest.Mocked<typeof path>;
  beforeEach(() => {
    // mockedPath.join.mockImplementation((pathToFile) => {
    //   return `path\\to\\${pathToFile}`;
    // });
  });
  test('should call join with pathToFile', async () => {
    // jest.mock('path', () => mockPath());
    // await readFileAsynchronously('fakeFile.txt');
    // expect(path.join).toHaveBeenCalledWith('fakeFile.txt');
    // expect(path.join).toBe('path\\to\\fakeFile.txt');
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
