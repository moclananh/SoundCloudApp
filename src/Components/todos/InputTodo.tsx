import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  title?: string | null;
  description?: string | null;
  details?: {
    status: Status | null;
    isClosed: boolean | null;
  };

  todoList: string[];
  setTodoList: (value: string[]) => void;
}

export enum Status {
  Active = "active",
  Inactive = "inactive",
}

const InputTodo = (props: Props) => {
  const { todoList, setTodoList } = props;
  const [todo, setToDo] = useState("");

  const handleOnClick = () => {
    if (!todo) {
      alert("Please enter todo");
      return;
    }
    setTodoList([...todoList, todo]);
    setToDo("");
  };

  return (
    <>
      <div>Your entered todo: {todo}</div>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          fullWidth
          onChange={(event) => {
            setToDo(event.target.value);
          }}
          value={todo}
        />
        {/* <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          fullWidth
        /> */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            handleOnClick();
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};
export default InputTodo;
