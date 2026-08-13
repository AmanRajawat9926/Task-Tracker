const express = require('express');
const router = express.Router();

// Import task controller functions
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');


// GET /tasks     
// POST /tasks    
router.route('/')
    .get(getTasks)
    .post(createTask);


// PUT /tasks/:id   
// DELETE /tasks/:id  
router.route('/:id')
    .put(updateTask)
    .delete(deleteTask);


// Export router so it can be used in app.js
module.exports = router;