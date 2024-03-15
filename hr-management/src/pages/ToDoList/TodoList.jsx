import React from "react";
import Todo from "./Todo";

const todolist=({todos,checkTodo, deleteTodo})=>{
    return(
        <div>
            {
            todos.map((todo) =>
            (
            <Todo key={todo.id}  title={todo.title} checkTodo={checkTodo} id={todo.id} isCompleted={todo.isCompleted} deleteTodo={deleteTodo}/>
            ))
            }
        {/* <Todo /> */}
        </div>
    );
};
export default todolist;