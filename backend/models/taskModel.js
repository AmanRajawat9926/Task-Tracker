const db = require('../config/pool');

const Task = {

    /**
     * Gets all tasks from the database
     * @returns {Promise<Array>} List of all tasks
     */
    getAll: async () => {

        // Get all tasks and sort them by newest first
        const [rows] = await db.query(
            'SELECT * FROM Tasks ORDER BY createdAt DESC'
        );

        // Return all tasks
        return rows;
    },


    /**
     * Gets one task using its ID
     * @param {number} id - Task ID
     * @returns {Promise<Object|null>} Task or null if not found
     */
    getById: async (id) => {

        // Find the task with the given ID
        const [rows] = await db.query(
            'SELECT * FROM Tasks WHERE id = ?',
            [id]
        );

        // Return the first task
        // Return null if no task is found
        return rows[0] || null;
    },


    /**
     * Creates a new task
     * @param {Object} taskData - Task data
     * @param {string} taskData.title - Task title
     * @param {string} taskData.description - Task description
     * @returns {Promise<Object>} The created task
     */
    create: async ({ title, description }) => {

        // Insert the new task into the database
        const [result] = await db.query(
            'INSERT INTO Tasks (title, description, isCompleted) VALUES (?, ?, false)',
            [title, description || '']
        );

        // Get the new task using the ID created by the database
        return Task.getById(result.insertId);
    },


    /**
     * Updates an existing task
     * @param {number} id - Task ID
     * @param {Object} updates - New task data
     * @returns {Promise<Object|null>} Updated task or null if not found
     */
    update: async (id, updates) => {

        // Get the current task before updating it
        const currentTask = await Task.getById(id);

        // If task does not exist, return null
        if (!currentTask) {
            return null;
        }

        // Use new title if given, otherwise keep the old title
        const title = updates.title !== undefined
            ? updates.title
            : currentTask.title;

        // Use new description if given, otherwise keep the old description
        const description = updates.description !== undefined
            ? updates.description
            : currentTask.description;

        // Use new completion value if given, otherwise keep the old value
        const isCompleted = updates.isCompleted !== undefined
            ? updates.isCompleted
            : currentTask.isCompleted;

        // Update the task in the database
        await db.query(
            'UPDATE Tasks SET title = ?, description = ?, isCompleted = ? WHERE id = ?',
            [title, description, isCompleted, id]
        );

        // Get and return the updated task
        return Task.getById(id);
    },


    /**
     * Deletes a task using its ID
     * @param {number} id - Task ID
     * @returns {Promise<boolean>} True if deleted, otherwise false
     */
    delete: async (id) => {

        // Delete the task with the given ID
        const [result] = await db.query(
            'DELETE FROM Tasks WHERE id = ?',
            [id]
        );

        // affectedRows tells us if a task was deleted
        // If it is greater than 0, the task was deleted
        return result.affectedRows > 0;
    }

};


// Export Task so the controller can use these functions
module.exports = Task;