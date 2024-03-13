// const express = require("express");
// const mongoose = require("mongoose");
import express from "express"
import mongoose from "mongoose"
const PORT=7000;
const connectionString = "mongodb+srv://tejuschaturvedi0:Kunal100@cluster0.hm2tbut.mongodb.net/HRM?retryWrites=true&w=majority"; 
// mongoose.connect(connectionString)
// .then(()=>console.log("Connected to DB"))
// .catch(()=> console.log("Got an error"));
const app = express();
app.use(express.json());
const TodoSchema= new mongoose.Schema({
    name: {type:String},
    completed:{type: Boolean, default:0},
});
const Todo= mongoose.model("Todo", TodoSchema);
app.get("/",(req,res)=>{
    res.send("Todo list home page")
});
app.get("/todos",async (req,res)=>{
//    const todos = await Todo.find();
   try {
    const todos = await Todo.find();
    if (!todos) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.post("/todos",async (req,res)=>{
    const todo = await Todo.create(req.body);
    res.json(todo);
    // try {
    //     const TodoData = await Todo.create(req.body);
    
    //     if (!TodoData) {
    //       return res.status(404).json({ msg: "List data not found" });
    //     }
    
    //     // await TodoData.save();
    //     res.status(200).json({ msg: "List created successfully" });
    //   } catch (error) {
    //     res.status(500).json({ error: error });
    //   }
});
app.get("/todos/:id",async (req,res)=>{
    const todo=  await Todo.findById(req.params.id);
    res.json(todo);
});

app.put("/todos/:id", async (req,res)=>{
    const todo= await Todo.findByIdAndUpdate(req.params.id,req.body);
    res.json(todo);
});
app.delete("/todos/:id",async (req,res)=>{
   const todo= await Todo.findByIdAndDelete(req);
   res.json(todo);
});
function connectDB(url)
{
    return mongoose.connect(url);
}
async function start(){
    try{
        await connectDB(connectionString)
        app.listen(PORT,()=>{
            console.log(`App running on PORT ${PORT}`);
         });
    }catch(err)
    {
        console.log(err);
    }
}
start()
