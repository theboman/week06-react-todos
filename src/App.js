import React, { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const inputBox = useRef();

  function changeHandler(e) {
    setText(e.target.value);
    //console.log(e.target.value);
  }

  function addTodo_Handler() {
    if (!text.trim().length > 0) {
      console.log("no entry");
      return;
    }

    let newTodos = [...todo];
    newTodos.push({
      id: Date.now(),
      task: text,
      linethru: false
    });

    setTodo(newTodos);
    console.log("your todo length is: " + newTodos.length);
    if (newTodos.length === 10) {
      setDisabled(true);
    }
    setText("");
    inputBox.current.focus();
  }

  function delete_Handler(id) {
    console.log("hello: " + id);
    let newTodos = [...todo];
    todo.forEach((todo, index) => {
      if (id === todo.id) {
        newTodos.splice(index, 1);
        setTodo(newTodos);
        setDisabled(false);
        return;
      }
    });
  }

  //   function strikeThrough_Handler(id) {
  //     console.log(id);
  // };

  // conditional rendering for input box feedback lets you know you gettting close to 10 todos
  // at 10 it tell you need to delete
  let todoFeedback;
  if (todo.length < 9) {
    todoFeedback = (
      <div className="inputError">
        You have: {todo.length} things todo right now
      </div>
    );
  } else if (todo.length === 9) {
    todoFeedback = (
      <div className="inputError todos_9">
        You have: {todo.length} things todo right now, your at 9! Your max is
        10.
      </div>
    );
  } else {
    todoFeedback = (
      <div className="inputError todos_10">
        !!!You have: {todo.length} things todo right now!!! You need to delete
        some!!
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Week06</h1>
      <h4>-- a simple todo list --</h4>
      <div className="input_box">
        <input
          ref={inputBox}
          className="input"
          // className={`input ${disabled ? 'test':'test2`}`}
          // className={`form-control round-lg ${!disabled ? '' : ''}`}
          disabled={disabled}
          id="input_todo"
          value={text}
          onChange={changeHandler}
          type="text"
          // style={{ width: "300px" }}
        />
        <div>
          <button
            onClick={addTodo_Handler}
            className="btn_input"
            disabled={disabled}
          >
            Add Todo
          </button>
        </div>
        <div className="feedback">{todoFeedback}</div>
      </div>
      <ul>
        {todo.map((todo, index) => {
          console.log(todo.length);
          return (
            <li
              key={todo.id}
              className="todo_item"
              // onClick={() => strikeThrough_Handler(todo.id)}
            >
              {todo.task}
              <div
                className="btn_delete"
                onClick={() => delete_Handler(todo.id)}
              >
                X
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
