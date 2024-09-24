const userController = require('../../../_controllers/UserController');
const pool = require('../../../_db/Pool');

// Mock do pool.query
jest.mock('../../../_db/Pool');

describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createUser should return a new user', async () => {
        const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
        pool.query.mockImplementation(() => Promise.resolve({ rows: [mockUser] }));

        const user = await userController.createUser('John Doe', 'john@example.com');

        expect(user).toEqual(mockUser);
        expect(pool.query).toHaveBeenCalledWith(
            'INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *',
            [expect.any(String), 'John Doe', 'john@example.com']
        );
    });

    test('createUser should throw an error if database operation fails', async () => {
        pool.query.mockImplementation(() => Promise.reject(new Error('Database error')));

        await expect(userController.createUser('John Doe', 'john@example.com')).rejects.toThrow('Database error');
    });

    test('getUsers should return a list of users', async () => {
        const mockUsers = [
            { id: '1', name: 'John Doe', email: 'john@example.com' },
            { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
        ];
        pool.query.mockImplementation(() => Promise.resolve({ rows: mockUsers }));

        const users = await userController.getUsers();

        expect(users).toEqual(mockUsers);
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users');
    });

    test('getUsers should throw an error if database operation fails', async () => {
        pool.query.mockImplementation(() => Promise.reject(new Error('Database error')));

        await expect(userController.getUsers()).rejects.toThrow('Database error');
    });

    test('getUserById should return a user', async () => {
        const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
        pool.query.mockImplementation(() => Promise.resolve({ rows: [mockUser], rowCount: 1 }));

        const user = await userController.getUserById('1');

        expect(user).toEqual(mockUser);
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = $1', ['1']);
    });

    test('getUserById should return null if user does not exist', async () => {
        pool.query.mockImplementation(() => Promise.resolve({ rows: [], rowCount: 0 }));

        const user = await userController.getUserById('999');

        expect(user).toBeNull();
    });

    test('getUserById should throw an error if database operation fails', async () => {
        pool.query.mockImplementation(() => Promise.reject(new Error('Database error')));

        await expect(userController.getUserById('1')).rejects.toThrow('Database error');
    });

    test('updateUser should return updated user', async () => {
        const mockUser = { id: '1', name: 'John Updated', email: 'john.updated@example.com' };
        pool.query.mockImplementation(() => Promise.resolve({ rows: [mockUser], rowCount: 1 }));

        const user = await userController.updateUser('1', 'John Updated', 'john.updated@example.com');

        expect(user).toEqual(mockUser);
        expect(pool.query).toHaveBeenCalledWith(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            ['John Updated', 'john.updated@example.com', '1']
        );
    });

    test('updateUser should return null if user does not exist', async () => {
        pool.query.mockImplementation(() => Promise.resolve({ rows: [], rowCount: 0 }));

        const user = await userController.updateUser('999', 'John Updated', 'john.updated@example.com');

        expect(user).toBeNull();
    });

    test('updateUser should throw an error if database operation fails', async () => {
        pool.query.mockImplementation(() => Promise.reject(new Error('Database error')));

        await expect(userController.updateUser('1', 'John Updated', 'john.updated@example.com')).rejects.toThrow('Database error');
    });

    test('deleteUser should return id of deleted user', async () => {
        pool.query.mockImplementation(() => Promise.resolve({ rowCount: 1 }));

        const result = await userController.deleteUser('1');

        expect(result).toEqual('1');
        expect(pool.query).toHaveBeenCalledWith('DELETE FROM users WHERE id = $1', ['1']);
    });

    test('deleteUser should return null if user does not exist', async () => {
        pool.query.mockImplementation(() => Promise.resolve({ rowCount: 0 }));

        const result = await userController.deleteUser('999');

        expect(result).toBeNull();
    });

    test('deleteUser should throw an error if database operation fails', async () => {
        pool.query.mockImplementation(() => Promise.reject(new Error('Database error')));

        await expect(userController.deleteUser('1')).rejects.toThrow('Database error');
    });
});