import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  toggleButtonGroupClasses,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputData, setInputData] = useState(
    JSON.parse(localStorage.getItem("todoData")) ?? []
  );
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [inputEditValue, setInputEditValue] = useState("");

  const handleInput = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  const handleAdd = () => {
    // const s = []
    // s.push(inputValue)
    setInputData((oldVal) => [...oldVal, inputValue]);
    setInputValue("");
    localStorage.setItem(
      "todoData",
      JSON.stringify([...inputData, inputValue])
    );
    console.log("asdsdasd", inputValue);
  };

  const handleEdit = (index, item) => {
    console.log("index", index, item);
    setEditId(index);
    setIsEdit(true);
    setInputEditValue(item);
  };

  const handleEditInput = (e) => {
    setInputEditValue(e.target.value);
    // setInputData(e.target.value);
  };

  const handleSave = () => {
    console.log("save", inputEditValue);
    setInputValue(inputEditValue);
  };

  const deleteTodo = (index) => {
    setInputData(inputData?.filter((id, i) => i !== index));
  };
  console.log(
    "inputValue",
    inputValue,
    "inputData",
    inputData,
    "inputEditValue",
    inputEditValue
  );

  const todoLocalData = JSON.parse(localStorage.getItem("todoData"));
  console.log("todoLocalData", todoLocalData);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {""}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
            <Box>
              <Typography display="flex">
                <CalendarMonthIcon />
                <h3 style={{ margin: "0px" }}>Today task</h3>
              </Typography>
              <Typography>personal</Typography>
              <Typography>Freelance</Typography>
              <Typography>Work</Typography>
              <Typography>Add task</Typography>
              <Typography>
                <h3>schedule task</h3>
              </Typography>
              <Typography>
                <h3>Setting</h3>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={8}>
            <Box>
              <Typography>
                <h3>Today Main Focus</h3>
                <h4>Design Team Meeting</h4>
              </Typography>
              <TextField
                id="outlined-basic"
                label="What is your next task"
                variant="outlined"
                value={inputValue}
                onChange={(e) => handleInput(e)}
              />
              <Button onClick={handleAdd}>Add todo</Button>
              {todoLocalData?.map((item, i) => {
                return (
                  <Box
                    className="test class"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {isEdit && editId === i && inputEditValue !== inputValue ? (
                      <TextField
                        id="outlined-basic"
                        label="What is your next task"
                        variant="outlined"
                        value={inputEditValue}
                        onChange={(e) => handleEditInput(e)}
                      />
                    ) : (
                      <Typography key={i}>
                        {isEdit && editId === i ? inputEditValue : item}
                      </Typography>
                    )}
                    <Box sx={{ justifyContent: "space-evenly" }}>
                      {isEdit &&
                      editId === i &&
                      inputEditValue !== inputValue ? (
                        <Button
                          component="span"
                          onClick={() => handleSave(i, item)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          component="span"
                          onClick={() => handleEdit(i, item)}
                        >
                          Edit
                        </Button>
                      )}

                      <Button
                        onClick={() => deleteTodo(i)}
                        component="span"
                        sx={{ margin: "0 0px 0 20px" }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
