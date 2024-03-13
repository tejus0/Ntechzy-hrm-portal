import mongoose from "mongoose";
const TodoSchema= mongoose.Schema({
    name: {type:String},
    completed:{type: Boolean, default:0},
});

export default  mongoose.model("Todo", TodoSchema);