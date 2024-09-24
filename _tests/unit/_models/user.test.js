const User = require('../../../_models/User');

describe('User class tests with validations', () => {
  test('Should create a user with correct properties', () => {
    const userData = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    const user = new User(userData.id, userData.name, userData.email);

    expect(user.id).toBe(userData.id);
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  test('Should throw an error if ID is undefined', () => {
    expect(() => new User(undefined, 'John Doe', 'john.doe@example.com')).toThrow('Invalid ID');
  });

  test('Should throw an error if name is undefined', () => {
    expect(() => new User('1', undefined, 'john.doe@example.com')).toThrow('Invalid name');
  });

  test('Should throw an error if email is undefined', () => {
    expect(() => new User('1', 'John Doe', undefined)).toThrow('Invalid email');
  });

  test('Should throw an error if ID is null', () => {
    expect(() => new User(null, 'John Doe', 'john.doe@example.com')).toThrow('Invalid ID');
  });

  test('Should throw an error if name is null', () => {
    expect(() => new User('1', null, 'john.doe@example.com')).toThrow('Invalid name');
  });

  test('Should throw an error if email is null', () => {
    expect(() => new User('1', 'John Doe', null)).toThrow('Invalid email');
  });

  test('Should throw an error if email is invalid', () => {
    expect(() => new User('1', 'John Doe', 'invalid-email')).toThrow('Invalid email');
  });

  test('Should throw an error if name is numeric', () => {
    expect(() => new User('1', 123, 'john.doe@example.com')).toThrow('Invalid name');
  });

  test('Should throw an error if email is numeric', () => {
    expect(() => new User('1', 'John Doe', 456)).toThrow('Invalid email');
  });

  test('Should throw an error if ID is numeric', () => {
    expect(() => new User(1, 'John Doe', 'john.doe@example.com')).toThrow('Invalid ID');
  });
});