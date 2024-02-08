// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  const account = getBankAccount(1000);
  const anotherAccount = getBankAccount(10);
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
    expect(
      !!account.fetchBalance() &&
        typeof account.fetchBalance().then === 'function',
    ).toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    //
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    //
  });
});
