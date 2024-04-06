import mongoose from "mongoose";
const TaskSchema = mongoose.Schema({
  Employee_id: { type: String },
  Title: { type: String },
  Description: { type: String },
  Completion_Date: { type: String },
  is_completed: { type: Number, default: 0 },
});

export default mongoose.model("Task", TaskSchema);
