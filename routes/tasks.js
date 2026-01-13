// Import Express Router
const express = require('express');
const router = express.Router();

// Import Task model
const Task = require('../models/Task');

// Import authentication middleware
const authMiddleware = require('../middleware/auth');

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};

// POST /api/tasks - Create new task (PROTECTED)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Get data from request body
    const { title, description, status, priority, dueDate } = req.body;

    // Validate: Title is required
    if (!title) {
      return res.status(400).json({ 
        message: 'Task title is required' 
      });
    }

    // Create new task
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user  // Link task to logged-in user
    });

    // Save task to database
    await newTask.save();

    // Populate user information (get username and email)
    await newTask.populate('user', 'username email');

    // Send success response
    res.status(201).json({
      message: 'Task created successfully',
      task: newTask
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ 
      message: 'Server error while creating task' 
    });
  }
});

// GET /api/tasks - Get all tasks with filtering, search, and pagination (PROTECTED)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // STEP 1: Build filter object
    const filter = { user: req.user };

    // STEP 2: Add status filter (if provided)
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // STEP 3: Add priority filter (if provided)
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    // STEP 4: Add search functionality (if provided)
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // STEP 5: Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // STEP 6: Execute query with pagination
    const tasks = await Task.find(filter)
      .populate('user', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // STEP 7: Get total count for pagination info
    const totalTasks = await Task.countDocuments(filter);

    // STEP 8: Calculate pagination info
    const totalPages = Math.ceil(totalTasks / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // STEP 9: Send response with pagination info
    res.status(200).json({
      message: 'Tasks retrieved successfully',
      tasks,
      pagination: {
        currentPage: page,
        totalPages,
        totalTasks,
        tasksPerPage: limit,
        hasNextPage,
        hasPrevPage
      }
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching tasks' 
    });
  }
});

// GET /api/tasks/:id - Get single task (PROTECTED)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    // Get task ID from URL parameter
    const taskId = req.params.id;

    // Validate task ID format
    if (!isValidObjectId(taskId)) {
      return res.status(400).json({ 
        message: 'Invalid task ID format' 
      });
    }

    // Find task by ID and check if it belongs to logged-in user
    const task = await Task.findOne({ _id: taskId, user: req.user })
      .populate('user', 'username email');

    // If task not found or doesn't belong to user
    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    // Send response
    res.status(200).json({
      message: 'Task retrieved successfully',
      task
    });

  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ 
      message: 'Server error while fetching task' 
    });
  }
});

// PUT /api/tasks/:id - Update task (PROTECTED)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // Get task ID from URL parameter
    const taskId = req.params.id;

    // Validate task ID format
    if (!isValidObjectId(taskId)) {
      return res.status(400).json({ 
        message: 'Invalid task ID format' 
      });
    }

    // Find task by ID and check if it belongs to logged-in user
    const task = await Task.findOne({ _id: taskId, user: req.user });

    // If task not found or doesn't belong to user
    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found or you do not have permission to update it' 
      });
    }

    // Get updated data from request body
    const { title, description, status, priority, dueDate } = req.body;

    // Update task fields (only if provided)
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    // Save updated task
    await task.save();

    // Populate user information
    await task.populate('user', 'username email');

    // Send response
    res.status(200).json({
      message: 'Task updated successfully',
      task
    });

  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ 
      message: 'Server error while updating task' 
    });
  }
});

// DELETE /api/tasks/:id - Delete task (PROTECTED)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Get task ID from URL parameter
    const taskId = req.params.id;

    // Validate task ID format
    if (!isValidObjectId(taskId)) {
      return res.status(400).json({ 
        message: 'Invalid task ID format' 
      });
    }
    // Find and delete task (only if belongs to logged-in user)
    const task = await Task.findOneAndDelete({ _id: taskId, user: req.user });

    // If task not found or doesn't belong to user
    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found or you do not have permission to delete it' 
      });
    }

    // Send response
    res.status(200).json({
      message: 'Task deleted successfully',
      task
    });

  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ 
      message: 'Server error while deleting task' 
    });
  }
});

// Export router
module.exports = router;