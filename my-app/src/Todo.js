// Todo.js
import React from "react";

const Todo = (props) => {

  return (
    <>
      <div className="todo-style">
        <i
          className="bi bi-pencil-square"
          onClick={() => {
            props.onEdit(props.id);
          }}
        />
        <i
          className="bi bi-trash"
          onClick={() => {
            props.onSelect(props.id);
          }}
        />
        <li>{props.text}</li>
      </div>
    </>
  );
};

export default Todo;
