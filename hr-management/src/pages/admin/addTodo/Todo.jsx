import {v4} from 'uuid';
import Todoform from './x';
import Todolist from './screens/TodoList.jsx';
import Modal from 'react-modal';
Modal.setAppElement('#root')

export default function Todo() {
  const[todos,setTodos]=useState([
    {
      id:1,
      title:"Play",
      isCompleted: false
    },
    {
      id:2,
      title:"Play Cricket",
      isCompleted: true
    },
    {
      id:3,
      title:"Play Cricket",
      isCompleted: true
    },
    {
      id:4,
      title:"Play Cricket",
      isCompleted: true
    },
  ]);
  const checkTodo=(id)=>{
    console.log(id);
    setTodos(todos.map(todo => {
      if(todo.id==id)
      todo.isCompleted =!todo.isCompleted
    console.log(todo.isCompleted);
    return todo;
    }));
  };
  const deleteTodo=(id)=>
  {
    setTodos(todos.filter(todo=>todo.id!=id))
  };
  const addTodo = (text) =>{
       const newTodo ={
         id:v4(),
         title: text,
         isCompleted: false,
       };
      setTodos([...todos, newTodo]);
  };
  return (
    <div>
    <Todoform  addTodo={addTodo} />
    <Todolist todos={todos} checkTodo={checkTodo} deleteTodo={deleteTodo}/>
    </div>
  )
};