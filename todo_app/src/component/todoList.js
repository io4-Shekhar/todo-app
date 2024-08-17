import React, { useState } from "react";
import EditTodo from "./todoEdit";
import CreateTodo from "./todoCreate";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dummy from "../assest/images/pic.jpg";

function TodoList() {
  console.log("random number", Math.random());
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todoData")) ?? [
      { id: Math.random() + 1, task: "task 1", completed: false },
      { id: Math.random() + 2, task: "task 2", completed: true },
    ]
  );

  const create = (newTodo) => {
    console.log(newTodo);
    setTodos([...todos, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todos, newTodo]));
  };

  const remove = (id) => {
    console.log("id", id);
    setTodos(todos.filter((todo) => todo.id !== id));
    localStorage.setItem(
      "todoData",
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
  };
  console.log("todos", todos);
  const update = (id, updtedTask) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
    console.log("updatdtodo", updatedTodos);
    localStorage.setItem("todoData", JSON.stringify(updatedTodos));
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  //   const todoLocalData = ;
  //   console.log("todoLocalData", todoLocalData);
  const todosList = todos.map((todo) => (
    <EditTodo
      toggleComplete={toggleComplete}
      update={update}
      remove={remove}
      key={todo.id}
      todo={todo}
    />
  ));

  return (
    <Box className="TodoList" sx={{ width: "90%", margin: "auto" }}>
      <Grid
        container
        sx={{
          backgroundColor: "white",
          height: "500px",
          borderRadius: "20px",
          margin: "auto",
          marginTop: "25px",
          padding: "10px",
          boxShadow: "2px 1px 2px 2px white",
        }}
        rowSpacing={1}
        // columnSpacing={{ xs: 1, sm: 2, md: 0 }}
      >
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            backgroundColor: "white",
            // marginLeft: "50px"
          }}
        >
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={dummy} />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="skyblue"
                    >
                      Ali Connors
                    </Typography>
                    {""}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ width: "150px" }} />
          </List>
          <Box style={{ marginLeft: "70px", marginTop: "20px" }}>
            <Typography display="flex">
              <CalendarMonthIcon />
              <h3 style={{ margin: "0px", cursor: "pointer" }}>Today task</h3>
            </Typography>
            <Box sx={{ margin: "30px" }}>
              <Typography sx={{ cursor: "pointer" }}>personal</Typography>
              <Typography sx={{ cursor: "pointer" }}>Freelance</Typography>
              <Typography sx={{ cursor: "pointer" }}>Work</Typography>
              <Typography sx={{ cursor: "pointer" }}>Add task</Typography>
            </Box>
            <Typography sx={{ cursor: "pointer" }}>
              <h3>schedule task</h3>
            </Typography>
            <Typography sx={{ cursor: "pointer" }}>
              <h3>Setting</h3>
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            backgroundColor: "#a18aff",
            borderRadius: "0px 10px 10px 0px",
            color: "white",
          }}
        >
          <Box sx={{ marginLeft: "40px" }}>
            <h3>
              <span>Today main focus</span>
            </h3>
            <h2>
              <span>Designing team meeting</span>
            </h2>
            <CreateTodo createTodo={create} />
          </Box>
          <ul
            style={{
              height: "200px",
              overflowY: todos?.length >= 5 ? "scroll" : "none",
            }}
          >
            {todosList}
          </ul>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoList;
