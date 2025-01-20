import { useState } from "react";
import "./App.css";
import InputTodo from "./Components/todos/InputTodo";

function App() {
  const [todoList, setTodoList] = useState(["default todo"]);
  return (
    <>
      <div>
        <InputTodo todoList={todoList} setTodoList={setTodoList} />
      </div>
      <div>
        <div>
          <h2>Todo List</h2>
          <ul>
            {todoList.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
