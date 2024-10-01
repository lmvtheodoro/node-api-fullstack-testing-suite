const express = require('express');
const axios = require('axios');
const router = express.Router();
const UserController = require('../_controllers/UserController.js');
const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: APIs related to users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       '400':
 *         description: Request error
 */
router.post(
    '/',
    [
      check('name').notEmpty().withMessage('Name is required'),
      check('email').isEmail().withMessage('Invalid email format'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email } = req.body;
      try {
        const newUser = await UserController.createUser(name, email);
        return res.status(201).json({
            message: 'User created successfully',
            user: newUser,
            link: `/users/${newUser.id}`
        });
      } catch (err) {
        if (err.code === '400') {
          return res.status(400).json({ error: err.message });
        } else if (err.code === '23505') {
          return res.status(409).json({ error: 'User already exists' });
        }
        return res.status(500).json({ error: 'Error creating user' });
      }
    }
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', async (req, res) => {
    try {
        const users = await UserController.getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Returns a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       '404':
 *         description: User not found
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserController.getUserById(id); // Adjust here
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Updates a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       '404':
 *         description: User not found
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await UserController.updateUser(id, name, email); // Await the call
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).json({ error: 'Error updating user' });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletes a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUserId = await UserController.deleteUser(id); // Await the call
        if (deletedUserId) {
            res.sendStatus(204);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});

/**
 * @swagger
 * /user/{id}/activities:
 *   get:
 *     summary: Fetches activities for a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       '200':
 *         description: List of user activities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       activity:
 *                         type: string
 *       '500':
 *         description: Error fetching user activities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error fetching user activities
 */
router.get('/user/:id/activities', async (req, res) => {
    const userId = req.params.id;

    try {
        const response = await axios.get(`http://another-api.com/user_activities/${userId}`);
        const activities = response.data;

        return res.status(200).json({ activities });
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching user activities' });
    }
});

module.exports = router;