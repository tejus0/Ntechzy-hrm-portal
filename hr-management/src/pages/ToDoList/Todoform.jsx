import React, {useState} from "react";
import { FormControl , Container , TextField, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
 
const TodoForm=({ addTodo  })=>{
    const [text,setText]= useState("")
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_BASE_URL}/createTodos`, text)
    .then((response)=>{
       toast.success("task added successfully !", {position:"top-right"})
      
    })
    .catch(error => console.log(error))
        addTodo(text);
        setText("");
    };
    return(
        <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
        <FormControl fullWidth={true}>
        <TextField label="I will do this*" required={true} value={text} onChange={(e)=>setText(e.target.value)}/>
        <Button variant="contained" color="primary" style={{marginTop: 5}}>ADD</Button>
        </FormControl>
        </form>
        </Container>
    
    )
}
export default TodoForm;