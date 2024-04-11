import mongoose from "mongoose";
const GrievanceSchema = mongoose.Schema({
  Employee_id: { type: String },
  Category: { type: String },
  Query: { type: String },
  is_resolved: { type: Number, default: 0 },
},
{
  timestamps: true,
}
);

export default mongoose.model("Grievance", GrievanceSchema);