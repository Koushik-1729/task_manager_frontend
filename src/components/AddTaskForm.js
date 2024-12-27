import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addTask } from '../services/api';

const AddTaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    addTask({ title, description })
      .then(() => setTasks((prev) => [...prev, { title, description, status: false }]))
      .catch((error) => console.error('Error adding task:', error));
    setTitle('');
    setDescription('');
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
        Add Task
      </Button>
    </Box>
  );
};

export default AddTaskForm;
