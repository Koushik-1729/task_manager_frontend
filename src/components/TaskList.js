import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteTask } from './services/api';

const TaskList = ({ tasks, setTasks, setEditTask }) => {
  const handleDelete = (id) => {
    deleteTask(id).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }).catch((error) => {
      console.error('Error deleting task:', error);
    });
  };

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} key={task._id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{task.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {task.description || 'No description available'}
              </Typography>
              <Typography variant="body2" color={task.status ? 'green' : 'red'}>
                {task.status ? 'Completed' : 'Pending'}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
                onClick={() => setEditTask(task)}
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => handleDelete(task._id)}
                sx={{ mt: 2, ml: 1 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
