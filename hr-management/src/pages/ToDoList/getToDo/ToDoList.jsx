import { v4 } from "uuid";
import Todolist from "../TodoList";
import Todoform from "../Todoform";
import Modal from "react-modal";
import { useState } from "react";
Modal.setAppElement("#root");

export default function ToDoList() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Play",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Play Cricket",
      isCompleted: true,
    },
    {
      id: 3,
      title: "Play Cricket",
      isCompleted: true,
    },
    {
      id: 4,
      title: "Play Cricket",
      isCompleted: true,
    },
  ]);
  const checkTodo = (id) => {
    console.log(id);
    setTodos(
      todos.map((todo) => {
        if (todo.id == id) todo.isCompleted = !todo.isCompleted;
        console.log(todo.isCompleted);
        return todo;
      })
    );
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };
  const addTodo = (text) => {
    const newTodo = {
      id: v4(),
      title: text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };
  return (
    <div>
      <Todoform addTodo={addTodo} />
      <Todolist todos={todos} checkTodo={checkTodo} deleteTodo={deleteTodo} />
    </div>
  );
}
