import React from "react";
import Action from "./Action";

function Layout({ 
  getTasksByPriority, 
  setSelectedTask, 
  selectedTask, 
  handleEditTask, 
  handleChangeStatus, 
  handleDeleteTask, 
  level 
}) {
  return (
    <div className="bg-gray-100 p-4 rounded border border-gray-400 shadow-md">
      <h2 className="text-lg font-bold mb-4">{level} Priority</h2>
      {getTasksByPriority(level).map((task, index) => (
        <div 
          key={index} 
          className="bg-white p-3 rounded mb-3 shadow-sm border hover:border-blue-400"
        >
          <h3 className="text-md font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          <p className="text-sm">
            <strong>Status:</strong> {task.status ? "Completed" : "Pending"}
          </p>

          <div className="flex mt-2 space-x-2">
            <button 
              className="text-blue-500 hover:underline" 
              onClick={() => setSelectedTask(task)}
            >
              Edit
            </button>
            <button 
              className="text-green-500 hover:underline" 
              onClick={() => handleChangeStatus(task)}
            >
              Mark {task.status ? "Pending" : "Completed"}
            </button>
            <button 
              className="text-red-500 hover:underline" 
              onClick={() => handleDeleteTask(task)}
            >
              Delete
            </button>
          </div>

          {selectedTask === task && (
            <Action
              task={selectedTask}
              handleEditTask={handleEditTask}
              handleChangeStatus={handleChangeStatus}
              handleDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Layout;
