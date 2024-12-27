import Task from '../model/Task.mjs';

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
// @desc Get all tasks
// @route GET /tasks
// @access Public
export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        if (!tasks) {
            throw new ApiError(404, 'No tasks found');
        }
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// @desc Create a new task
// @route POST /tasks
// @access Public
export const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        if (!title) {
            throw new ApiError(400, 'Title is required');
        }

        const task = new Task({ title, description, status });
        const savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        next(error); 
    }
};

// @desc Update a task
// @route PUT /tasks/:id
// @access Public
export const updateTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        
        if (!title) {
            throw new ApiError(400, 'Title is required');
        }
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true }
        );

        if (!task) {
            throw new ApiError(404, 'Task not found');
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
};

// @desc Delete a task
// @route DELETE /tasks/:id
// @access Public
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            throw new ApiError(404, `Task with id ${req.params.id} not found.`);
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
};