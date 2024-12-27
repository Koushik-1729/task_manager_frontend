import express from 'express';
import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
} from '../controllers/taskControllers.mjs';

const router = express.Router();


// @route   GET /tasks
// @desc    Get all tasks
// @access  Public
router.get('/', getAllTasks); 

// @route   POST /tasks
// @desc    Create a new task
// @access  Public
router.post('/', createTask);  

// @route   PUT /tasks/:id
// @desc    Update a task
// @access  Public
router.put('/:id', updateTask);

// @route   DELETE /tasks/:id
// @desc    Delete a task
// @access  Public
router.delete('/:id', deleteTask);  

export default router;
