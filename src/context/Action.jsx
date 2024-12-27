import React, { useState } from "react";

const Action = ({ task, handleEditTask, handleChangeStatus, handleDeleteTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSaveEdit = () => {
    if (editedTitle.trim() === "" || editedDescription.trim() === "") {
      alert("Title and Description are required.");
      return;
    }
    handleEditTask({ ...task, title: editedTitle, description: editedDescription });
    setEditMode(false);
  };

  return (
    <div className="mt-2">
      {editMode ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Edit Title"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Edit Description"
            className="w-full p-2 border rounded"
          />
          <button className="btn btn-primary mr-2" onClick={handleSaveEdit}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="space-x-2">
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            Edit
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleChangeStatus(task)}
          >
            Mark {task.status ? "Pending" : "Completed"}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
                handleDeleteTask(task);
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Action;
