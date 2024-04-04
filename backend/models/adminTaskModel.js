import mongoose from "mongoose";
const TaskSchema= mongoose.Schema({
    Employee_id:{type:String},
    Title: {type:String},
    Description:{type: String},
});

export default  mongoose.model("Task", TaskSchema);