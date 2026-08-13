const Task = require('../models/taskModel');

/**
 * Gets all tasks
 * @param {Object} req - Request from the client
 * @param {Object} res - Response sent to the client
 */
const getTasks = async (req, res) => {
    try {
        // Get all tasks from the model
        const tasks = await Task.getAll();

        // Send tasks to the client
        res.status(200).json({ success: true, data: tasks });

    } catch (error) {
        // Send error if something goes wrong
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/**
 * Creates a new task
 * @param {Object} req - Request from the client
 * @param {Object} res - Response sent to the client
 */
const createTask = async (req, res) => {
    try {
        // Get title and description from request body
        const { title, description } = req.body;

        // Check if title is missing or empty
        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        // Create a new task
        const newTask = await Task.create({
            // Remove extra spaces from the title
            title: title.trim(),
            description
        });

        // Send the new task to the client
        res.status(201).json({
            success: true,
            data: newTask
        });

    } catch (error) {
        // Send error if task is not created
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/**
 * Updates an existing task
 * @param {Object} req - Request from the client
 * @param {Object} res - Response sent to the client
 */
const updateTask = async (req, res) => {
    try {
        // Get task ID from the URL
        const { id } = req.params;

        // Update the task using ID and new data
        const updatedTask = await Task.update(id, req.body);

        // Check if the task was not found
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Send the updated task to the client
        res.status(200).json({
            success: true,
            data: updatedTask
        });

    } catch (error) {
        // Send error if something goes wrong
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/**
 * Deletes an existing task
 * @param {Object} req - Request from the client
 * @param {Object} res - Response sent to the client
 */
const deleteTask = async (req, res) => {
    try {
        // Get task ID from the URL
        const { id } = req.params;

        // Delete the task using its ID
        const success = await Task.delete(id);

        // Check if the task was not found
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Send success response after deleting the task
        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        // Send error if something goes wrong
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Export these functions so routes can use them
module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};