import mongoose from "mongoose";
const leaveSchema= new mongoose.Schema({
    name: {
        type: String,
        // required: true,
      },
      employeeNo: {
        type: String,
        // required: true,
      },
      leaveType:{
        type: String,
        // required: true,
      },
      Day:{
        type: String,
        // required: true,
      },
      From:{
        type: String,
        // required: true,
      },
      To:{
        type: String,
        // required: true,
      },
      Days:{
        type:Number,
      },
      RemLeaves:{
        type:Number
      },
      Description:{
        type:String,
        // required:true,
      },
      CancelReason:{
        type:String,
        default:""
      },
      is_approved:{
        type:Number,
        default:0
      }
})

export default mongoose.model("Leave", leaveSchema);