import React, { useState, useEffect } from "react";
import axios from "axios";

// Task Dashboard Component
const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Use the API base URL based on the environment
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"; // Fallback for local development

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (task) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      if (!updatedTask._id) {
        console.error("Task ID is missing!");
        return;
      }
      const response = await axios.put(`${API_BASE_URL}/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? response.data : task)));
      setIsEditing(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error("Task ID is missing");
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
      console.log("Task deleted:", response.data);
      fetchTasks(); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      {isEditing ? (
        <EditTaskForm
          task={selectedTask}
          onSave={handleEditTask}
          onCancel={() => {
            setIsEditing(false);
            setSelectedTask(null);
          }}
        />
      ) : (
        <AddTaskForm onAdd={handleAddTask} />
      )}
      <TaskList
        tasks={tasks}
        onEdit={(task) => {
          setSelectedTask(task);
          setIsEditing(true);
        }}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

// Add Task Form
const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    const newTask = { title, description, status: "Pending" };
    onAdd(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full border rounded p-2 mb-2"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full border rounded p-2 mb-2"
      />
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
};

// Edit Task Form
const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, status };
    onSave(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full border rounded p-2 mb-2"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full border rounded p-2 mb-2"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border rounded p-2 mb-2"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit" className="btn btn-success mr-2">
        Save
      </button>
      <button type="button" onClick={onCancel} className="btn btn-secondary">
        Cancel
      </button>
    </form>
  );
};

// Task List
const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button
            onClick={() => onEdit(task)}
            className="btn btn-warning mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskDashboard;
