// Uncomment the code below and write your tests
import { getBankAccount } from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const account = getBankAccount(1000);
  const anotherAccount = getBankAccount(10);

  beforeEach(() => {
    //
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(1200);
    }).toThrow('Insufficient funds: cannot withdraw more than 1000');
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      account.transfer(1200, anotherAccount);
    }).toThrow('Insufficient funds: cannot withdraw more than 1000');
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(100, account);
    }).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    expect(account.deposit(200).getBalance()).toBe(1200);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(200).getBalance()).toBe(1000);
  });

  test('should transfer money', () => {
    expect(account.transfer(200, anotherAccount).getBalance()).toBe(800);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // jest.doMock('lodash/random', () => {
    //   // const original = jest.requireActual<typeof import('lodash')>('lodash');
    //   return {
    //     default: jest.fn(() => 1),
    //     __esModule: true,
    //   };
    // });
    const spy = jest.spyOn(lodash, 'random').mockImplementation(() => 1);
    expect(typeof (await account.fetchBalance())).toBe('number');
    expect(spy).toHaveBeenCalled();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    account.fetchBalance = jest.fn(() =>
      Promise.resolve(lodash.random(0, 100, false)),
    );
    account.withdraw(account.getBalance());
    await account.synchronizeBalance();
    expect(typeof account.getBalance()).toBe('number');
    expect(account.getBalance() >= 0).toBe(true);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = jest.fn(() => Promise.resolve(null));
    expect(async () => {
      await account.synchronizeBalance();
    }).rejects.toThrow('Synchronization failed');
  });
});
