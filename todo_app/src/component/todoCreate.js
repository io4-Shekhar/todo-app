import { Button, TextField } from "@mui/material";
import React, { useState, useReducer } from "react";

function CreateTodo({ task, createTodo }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      task: "",
    }
  );

  const handleChange = (evt) => {
    setUserInput({ [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newTodo = {
      id: Math.random() + 3,
      task: userInput.task,
      completed: false,
    };
    createTodo(newTodo);
    setUserInput({ task: "" });
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <label htmlFor="task"></label>
      <TextField
        id="outlined-basic"
        label="What is your next task"
        variant="outlined"
      />
      {/* <input
        value={userInput.task}
        onChange={handleChange}
        id="task"
        type="text"
        name="task"
        placeholder="What is your next task"
      /> */}
      <Button
        variant="contained"
        sx={{ height: "55px", marginLeft: "10px", textTransform: "capitalize" }}
      >
        Add todo
      </Button>
    </form>
  );
}

export default CreateTodo;
