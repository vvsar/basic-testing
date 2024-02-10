// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash/throttle', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const createArg = {
    baseURL: 'https://jsonplaceholder.typicode.com',
  };
  const mockData = {
    data: [{ id: 1, name: 'John' }],
  };
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockedAxios.create.mockImplementation(() => mockedAxios);
    mockedAxios.get.mockImplementation(() => Promise.resolve(mockData));
    jest.runOnlyPendingTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('');
    expect(mockedAxios.create).toHaveBeenCalledWith(createArg);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('1');
    expect(mockedAxios.get).toHaveBeenCalledWith('1');
  });

  test('should return response data', async () => {
    expect(await throttledGetDataFromApi('')).toBe(mockData.data);
  });
});
