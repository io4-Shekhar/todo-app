import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EditTodo({ todo, remove, update, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);

  const handleDelete = (evt) => {
    remove(evt);
  };
  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = (evt) => {
    evt.preventDefault();
    update(todo.id, task);
    toggleFrom();
  };
  const handleChange = (evt) => {
    setTask(evt.target.value);
  };
  const toggleCompleted = (evt) => {
    toggleComplete(evt.target.id);
  };

  let result;
  if (isEditing) {
    result = (
      <Box className="Todo">
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
          <input onChange={handleChange} value={task} type="text" />
          <Button onClick={handleUpdate}>Save</Button>
        </form>
      </Box>
    );
  } else {
    result = (
      <Box className="Todo">
        <li
          id={todo.id}
          onClick={toggleCompleted}
          className={todo.completed ? "Todo-task completed" : "Todo-task"}
        >
          {todo.task}
        </li>
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          className="Todo-buttons"
        >
          <Button onClick={toggleFrom}>
            <EditIcon />
          </Button>
          <Button onClick={() => handleDelete(todo.id)}>
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
    );
  }
  return result;
}

export default EditTodo;
