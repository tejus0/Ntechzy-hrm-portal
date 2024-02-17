import mongoose from "mongoose";
const leaveSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      employeeNo: {
        type: String,
        required: true,
      },
})

export default mongoose.model("Leaves", leaveSchema);