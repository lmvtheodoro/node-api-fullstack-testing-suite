const User = require('../_models/User.js');
const pool = require('../_db/Pool.js');

async function createUser(name, email) {
    const id = Date.now().toString();
    console.log('Creating user with name:', name, 'and email:', email);
    const newUser = new User(id, name, email);
    const query = 'INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *'; 
    const values = [newUser.id, newUser.name, newUser.email]; 

    try {
        console.log('Executing query:', query, 'with values:', values);
        const result = await pool.query(query, values);
        console.log('User created successfully:', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error creating user:', err.message);
        console.error('Full error details:', err);
        throw err;
    }
}

async function getUsers() {
    const query = 'SELECT * FROM users';

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
}

async function getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching user:', err);
        throw err;
    }
}

async function updateUser(id, name, email) {
    const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
    const values = [name, email, id];
    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}

async function deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [id];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return null;
        }
        return id;
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};