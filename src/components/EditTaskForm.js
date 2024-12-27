import React, { useState} from 'react';
import { TextField, Button, Box } from '@mui/material';
import { updateTask } from '../services/api';

const EditTaskForm = ({ task, setEditTask, setTasks }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    updateTask(task._id, { title, description })
      .then(() => {
        setTasks((prev) =>
          prev.map((t) => (t._id === task._id ? { ...t, title, description } : t))
        );
        setEditTask(null);
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <TextField
        label="Task Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Task Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit">
        Update Task
      </Button>
    </Box>
  );
};

export default EditTaskForm;
